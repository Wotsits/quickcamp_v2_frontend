import React, { useContext, useState } from "react";
import AuthContext from "../../../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PageHeader from "../../../components/molecules/PageHeader";
import ContentBlock from "../../../components/atoms/ContentBlock";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LeadGuest } from "../../../types";
import EditIcon from "@mui/icons-material/Edit";
import { getLeadGuestById } from "../../../services/queries/getLeadGuestById";
import { ROUTES } from "../../../settings";
import { generateStandardizedDateFormat } from "../../../utils/dateTimeManipulation";
import ArticleIcon from "@mui/icons-material/Article";
import Modal from "../../../components/molecules/Modal";
import { ModalHeader } from "../../../components/molecules/Modal";
import NameEditForm from "../../../components/organisms/EditLeadGuestForms/NameEditForm";
import ContactDetailsEditForm from "../../../components/organisms/EditLeadGuestForms/ContactDetailsEditForm";
import AddressEditForm from "../../../components/organisms/EditLeadGuestForms/AddressEditForm";
import AddCircleIconOutline from "@mui/icons-material/AddCircleOutline";
import NotesEditForm from "../../../components/organisms/EditLeadGuestForms/NotesEditForm";

import "./style.css";
import { updateLeadGuest } from "../../../services/mutations/updateLeadGuest";
import { createNote } from "../../../services/mutations/createNote";

const notesTableColumnSpec = ["Content", "Date", "User"];

const IndividualLeadGuest = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const params = useParams();

  if (!params || !params.id) {
    return <div>Lead Guest ID not found</div>;
  }

  const id = parseInt(params.id);

  // -------------
  // STATE
  // -------------

  const [nameEditModalOpen, setNameEditModalOpen] = useState(false);
  const [contactDetailsEditModalOpen, setContactDetailsEditModalOpen] =
    useState(false);
  const [addressEditModalOpen, setAddressEditModalOpen] = useState(false);
  const [privateNoteAddModalOpen, setPrivateNoteAddModalOpen] = useState(false);
  const [publicNoteAddModalOpen, setPublicNoteAddModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [updateSuccessMessage, setUpdateSuccessMessage] = useState<string | null>(null);

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading,
    isError,
    data: leadGuestData,
    error,
  } = useQuery<{ data: LeadGuest }, Error>(["lead-guest", id], () =>
    getLeadGuestById({ token: user.token, id: id })
  );

  const {
    mutate: updateLeadGuestMutate,
    isLoading: updateLeadGuestIsLoading,
  } = useMutation({
    mutationFn: updateLeadGuest,
    onSuccess: () => {
      queryClient.invalidateQueries("lead-guest");
      queryClient.invalidateQueries("booking");
      setUpdateSuccessMessage("Lead Guest updated successfully");

      setTimeout(() => {
        setUpdateSuccessMessage(null);
      }, 3000);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  });

  const {
    mutate: createNoteMutate,
    isLoading: createNoteIsLoading,
  } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["lead-guest", leadGuestData?.data.id]);
      setUpdateSuccessMessage("Note created successfully");

      setTimeout(() => {
        setUpdateSuccessMessage(null);
      }, 3000);

    },
    onError: (error: Error) => {
      setErrorMessage(error.message);

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  });

  // -------------
  // HANDLERS
  // -------------

  function handleNameSave(firstName: string, lastName: string) {
    updateLeadGuestMutate({
      token: user.token,
      id: id,
      firstName: firstName,
      lastName: lastName,
    });
  }

  function handleContactDetailsSave(tel: string, email: string) {
    updateLeadGuestMutate({
      token: user.token,
      id: id,
      tel: tel,
      email: email,
    });
  }

  function handleAddressDetailsSave(
    address1: string,
    address2: string,
    townCity: string,
    county: string,
    postcode: string,
    country: string
  ) {
    updateLeadGuestMutate({
      token: user.token,
      id: id,
      address1: address1,
      address2: address2,
      townCity: townCity,
      county: county,
      postcode: postcode,
      country: country,
    });
  }

  function handleNoteCreation(
    content: string,
    noteType: "PUBLIC" | "PRIVATE",
    id: number | undefined
  ) {
    createNoteMutate({
      token: user.token,
      content: content,
      noteType: noteType,
      leadGuestId: leadGuestData?.data.id,
    });
  }

  // -------------
  // RENDER
  // -------------

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!leadGuestData) {
    return <div>Lead Guest not found</div>;
  }

  return (
    <div id="lead-guest">
      {/* Name Edit Modal */}
      {nameEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Guest Name"
            onClose={() => {
              setNameEditModalOpen(false)
              setUpdateSuccessMessage(null)
            }}
          />
          <NameEditForm
            firstNameIn={leadGuestData.data.firstName}
            lastNameIn={leadGuestData.data.lastName}
            callbackOnSave={handleNameSave}
            loading={updateLeadGuestIsLoading}
            errorMessage={errorMessage}
            successMessage={updateSuccessMessage}
          />
        </Modal>
      )}

      {/* Contact Details Edit Modal */}
      {contactDetailsEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Contact Details"
            onClose={() => {
              setContactDetailsEditModalOpen(false)
              setUpdateSuccessMessage(null)
            }}
          />
          <ContactDetailsEditForm
            telIn={leadGuestData.data.tel}
            emailIn={leadGuestData.data.email}
            callbackOnSave={handleContactDetailsSave}
            loading={updateLeadGuestIsLoading}
            errorMessage={errorMessage}
            successMessage={updateSuccessMessage}
          />
        </Modal>
      )}

      {/* Address Edit Modal */}
      {addressEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Address"
            onClose={() => {
              setAddressEditModalOpen(false)
              setUpdateSuccessMessage(null)
            }}
          />
          <AddressEditForm
            address1In={leadGuestData.data.address1}
            address2In={leadGuestData.data.address2}
            townCityIn={leadGuestData.data.townCity}
            countyIn={leadGuestData.data.county}
            postcodeIn={leadGuestData.data.postcode}
            countryIn={leadGuestData.data.country}
            callbackOnSave={handleAddressDetailsSave}
            loading={updateLeadGuestIsLoading}
            errorMessage={errorMessage}
            successMessage={updateSuccessMessage}
          />
        </Modal>
      )}

      {/* Private Notes Add Modal */}
      {privateNoteAddModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Add Private Note"
            onClose={() => {
              setPrivateNoteAddModalOpen(false)
              setUpdateSuccessMessage(null)
            }}
          />
          <NotesEditForm
            noteTypeIn="PRIVATE"
            callbackOnSave={handleNoteCreation}
            loading={createNoteIsLoading}
            errorMessage={errorMessage}
            successMessage={updateSuccessMessage}
          />
        </Modal>
      )}

      {/* Public Notes Add Modal */}
      {publicNoteAddModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Add Public Note"
            onClose={() => setPublicNoteAddModalOpen(false)}
          />
          <NotesEditForm
            noteTypeIn="PUBLIC"
            callbackOnSave={handleNoteCreation}
            loading={createNoteIsLoading}
            errorMessage={errorMessage}
            successMessage={updateSuccessMessage}
          />
        </Modal>
      )}

      {/* Page Header */}
      <PageHeader
        title="Lead Guest"
        subTitle={`Guest ID: ${leadGuestData.data.id}`}
      >
        <Button
          variant="contained"
          onClick={() => {}}
          startIcon={<ArticleIcon />}
        >
          View Log
        </Button>
      </PageHeader>

      {/* Lead Guest Information */}

      <div id="lead-guest-information-container">
        {/* Lead Guest Details */}

        <ContentBlock
          title="Name Details"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => setNameEditModalOpen(true)} />
            </IconButton>
          }
        >
          <Typography variant="body1" gutterBottom>
            First Name: {leadGuestData.data.firstName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Last Name: {leadGuestData.data.lastName}
          </Typography>
        </ContentBlock>

        <ContentBlock
          title="Contact Details"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => setContactDetailsEditModalOpen(true)} />
            </IconButton>
          }
        >
          <Typography variant="body1" gutterBottom>
            Phone Number: {leadGuestData.data.tel}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {leadGuestData.data.email}
          </Typography>
        </ContentBlock>

        <ContentBlock
          title="Address"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => setAddressEditModalOpen(true)} />
            </IconButton>
          }
        >
          <Typography variant="body1" gutterBottom>
            Address 1: {leadGuestData.data.address1}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Address 2: {leadGuestData.data.address2}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Town/City: {leadGuestData.data.townCity}
          </Typography>
          <Typography variant="body1" gutterBottom>
            County: {leadGuestData.data.county}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Postcode: {leadGuestData.data.postcode}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Country: {leadGuestData.data.country}
          </Typography>
        </ContentBlock>

        <ContentBlock title="Bookings">
          <Typography variant="body1" gutterBottom>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Arrival Date</TableCell>
                    <TableCell>Departure Date</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Unit Type</TableCell>
                    <TableCell>Total Fee</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!leadGuestData.data.bookings && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        Error retrieving bookings. Not available on object.
                        Refer to technical support.
                      </TableCell>
                    </TableRow>
                  )}
                  {leadGuestData.data.bookings &&
                    leadGuestData.data.bookings.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          This guest has no bookings
                        </TableCell>
                      </TableRow>
                    )}
                  {leadGuestData.data.bookings &&
                    leadGuestData.data.bookings.map((booking) => {
                      return (
                        <TableRow
                          className="clickable"
                          onClick={() =>
                            navigate(ROUTES.ROOT + ROUTES.BOOKINGS + booking.id)
                          }
                          hover
                        >
                          <TableCell>{booking.id}</TableCell>
                          <TableCell>
                            {generateStandardizedDateFormat(booking.start)}
                          </TableCell>
                          <TableCell>
                            {generateStandardizedDateFormat(booking.end)}
                          </TableCell>
                          <TableCell>{booking.unit.name}</TableCell>
                          <TableCell>{booking.unit.unitType!.name}</TableCell>
                          <TableCell>£{booking.totalFee}</TableCell>
                          <TableCell>{booking.status}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </ContentBlock>

        <ContentBlock title="Notes">
          <div className="lead-guest-section-subsection-title">
            <div className="lead-guest-section-subsection-title-left">
              <Typography variant="h6" component="h2" gutterBottom>
                Public Notes
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                These notes are visible to guest.
              </Typography>
            </div>
            <div className="lead-guest-section-subsection-title-right">
              <IconButton onClick={() => setPublicNoteAddModalOpen(true)}>
                <AddCircleIconOutline />
              </IconButton>
            </div>
          </div>
          <TableContainer sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {notesTableColumnSpec.map((column) => (
                    <TableCell>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!leadGuestData.data.notes && (
                  <TableRow>
                    <TableCell colSpan={notesTableColumnSpec.length}>
                      Error retrieving notes. Not available on object. Refer to
                      technical support.
                    </TableCell>
                  </TableRow>
                )}
                {leadGuestData.data.notes &&
                  !leadGuestData.data.notes.filter(
                    (note) => note.noteType === "PUBLIC"
                  ).length && (
                    <TableRow>
                      <TableCell colSpan={notesTableColumnSpec.length}>
                        This guest has no private notes
                      </TableCell>
                    </TableRow>
                  )}
                {leadGuestData.data.notes &&
                  leadGuestData.data.notes
                    .filter((note) => note.noteType === "PUBLIC")
                    .map((note) => {
                      return (
                        <TableRow>
                          <TableCell sx={{whiteSpace: "pre-line"}}>{note.content}</TableCell>
                          <TableCell>
                            {generateStandardizedDateFormat(note.createdOn)}
                          </TableCell>
                          <TableCell>{note.user.username}</TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="lead-guest-section-subsection-title">
            <div className="lead-guest-section-subsection-title-left">
              <Typography variant="h6" component="h2" gutterBottom>
                Private Notes
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                These notes are not visible to guest.
              </Typography>
            </div>
            <div className="lead-guest-section-subsection-title-right">
              <IconButton onClick={() => setPrivateNoteAddModalOpen(true)}>
                <AddCircleIconOutline />
              </IconButton>
            </div>
          </div>
          <TableContainer sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {notesTableColumnSpec.map((column) => (
                    <TableCell>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!leadGuestData.data.notes && (
                  <TableRow>
                    <TableCell colSpan={notesTableColumnSpec.length}>
                      Error retrieving notes. Not available on object. Refer to
                      technical support.
                    </TableCell>
                  </TableRow>
                )}
                {leadGuestData.data.notes &&
                  !leadGuestData.data.notes.filter(
                    (note) => note.noteType === "PRIVATE"
                  ).length && (
                    <TableRow>
                      <TableCell colSpan={notesTableColumnSpec.length}>
                        This guest has no public notes
                      </TableCell>
                    </TableRow>
                  )}
                {leadGuestData.data.notes &&
                  leadGuestData.data.notes
                    .filter((note) => note.noteType === "PRIVATE")
                    .map((note) => {
                      return (
                        <TableRow>
                          <TableCell sx={{whiteSpace: "pre-line"}}>{note.content}</TableCell>
                          <TableCell>
                            {generateStandardizedDateFormat(note.createdOn)}
                          </TableCell>
                          <TableCell>{note.user.username}</TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentBlock>
      </div>
    </div>
  );
};

export default IndividualLeadGuest;
