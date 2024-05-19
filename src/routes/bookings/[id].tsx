import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { Booking } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import "./style.css";
import OccupantCard from "../../components/molecules/OccupantCard";
import { ROUTES } from "../../settings";
import PageHeader from "../../components/molecules/PageHeader";
import EditIcon from "@mui/icons-material/Edit";
import ContentBlock from "../../components/atoms/ContentBlock";
import Modal, { ModalHeader } from "../../components/molecules/Modal";
import EditLeadGuestForm from "../../components/organisms/EditBookingForms/EditLeadGuestForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import LabelAndValuePair from "../../components/molecules/LabelAndValuePair";

const IndividualBooking = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

  const params = useParams();

  if (!params || !params.id) {
    return <div>BookingId not found</div>;
  }

  const id = parseInt(params.id);

  // -------------
  // STATE
  // -------------

  const [leadGuestEditModalOpen, setLeadGuestEditModalOpen] =
    useState<boolean>(false);
  const [bookingDetailsEditModalOpen, setBookingDetailsEditModalOpen] =
    useState<boolean>(false);
  const [occupantDetailsEditModalOpen, setOccupantDetailsEditModalOpen] =
    useState<boolean>(false);
  const [financeDetailsEditModalOpen, setFinanceDetailsEditModalOpen] =
    useState<boolean>(false);

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data: bookingData, error } = useQuery<{data: Booking}, Error>(
    ["booking", id],
    () => getBookingById({ token: user.token, id: id })
  );

  // -------------
  // HELPERS
  // -------------

  function calculateTotalPaid(booking: Booking) {
    let totalPaid = 0;
    booking.payments?.forEach((payment) => {
      totalPaid += payment.paymentAmount;
    });
    return totalPaid;
  }

  function calculateBalance(booking: Booking) {
    return booking.totalFee - calculateTotalPaid(booking);
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

  if (!bookingData) {
    return <div>Booking not found</div>;
  }

  const isPartOfGroupOfBookings = bookingData.data.bookingGroup && bookingData.data.bookingGroup.bookings.length > 1; 

  return (
    <div id="booking">

      {/* Lead Guest Edit Modal */}

      {leadGuestEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Lead Guest"
            onClose={() => setLeadGuestEditModalOpen(false)}
          />
          <EditLeadGuestForm currentLeadGuestIn={bookingData.data.leadGuest} bookingId={bookingData.data.id} />
        </Modal>
      )}

      {/* Booking Details Edit Modal */}

      {bookingDetailsEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Booking Details"
            onClose={() => setBookingDetailsEditModalOpen(false)}
          />
          <div className="edit-booking-details-form">
            Edit Booking Details Form Here
          </div>
        </Modal>
      )}

      {/* Occupant Details Edit Modal */}

      {occupantDetailsEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Occupant Details"
            onClose={() => setOccupantDetailsEditModalOpen(false)}
          />
          <div className="edit-occupant-details-form">
            Edit Occupant Details Form Here
          </div>
        </Modal>
      )}

      {/* Finance Details Edit Modal */}

      {financeDetailsEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Finance Details"
            onClose={() => setFinanceDetailsEditModalOpen(false)}
          />
          <div className="edit-finance-details-form">
            Edit Finance Details Form Here
          </div>
        </Modal>
      )}

      <PageHeader title="Booking" subTitle={`Booking ID: ${bookingData.data.id}`}>
      <div id="individual-booking-header-right">
          {isPartOfGroupOfBookings && (
          <Button
            variant="contained"
            onClick={() => navigate(ROUTES.ROOT + ROUTES.BOOKING_GROUPS + bookingData.data.bookingGroupId)
            }
          >
            View Booking Group
          </Button>
          )}
        </div>
      </PageHeader>

      <div id="booking-information-container">
        {/* Lead Guest Details */}

        <ContentBlock
          title="Booking Details"
          topRightComponent={
            <div>
              <IconButton>
                <VisibilityIcon
                  onClick={() => {
                    navigate(
                      ROUTES.ROOT + ROUTES.GUESTS + bookingData.data.leadGuest.id
                    );
                  }}
                />
              </IconButton>
              <IconButton>
              <EditIcon onClick={() => setLeadGuestEditModalOpen(true)} />
            </IconButton>
            </div>
          }
        >
          <LabelAndValuePair label="Name" value={bookingData.data.leadGuest.firstName + " " + bookingData.data.leadGuest.lastName} />
          <LabelAndValuePair label="Email" value={bookingData.data.leadGuest.email} />
          <LabelAndValuePair label="Tel" value={bookingData.data.leadGuest.tel} />
        </ContentBlock>

        {/* Booking Details */}

        <ContentBlock
          title="Booking Details"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => setBookingDetailsEditModalOpen(true)} />
            </IconButton>
          }
        >
          <LabelAndValuePair label="Unit" value={bookingData.data.unit.name} />
          <LabelAndValuePair label="Dates" value={new Date(bookingData.data.start).toUTCString() + " - " + 
            new Date(bookingData.data.end).toUTCString()} />
        </ContentBlock>

        {/* Occupant Details */}

        <ContentBlock
          title="Occupant Details"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => setOccupantDetailsEditModalOpen(true)} />
            </IconButton>
          }
        >
          <Box sx={{ mb: 3 }} justifyContent="space-between">
            <Typography variant="h6" component="h2" gutterBottom>
              Guests
            </Typography>
            <div className="occupant-cards">
              {bookingData.data.guests?.map((guest) => {
                const name = guest.name;
                const type = guest.guestType!.name;
                const start = new Date(guest.start);
                const end = new Date(guest.end);
                const checkedIn = guest.checkedIn !== null;
                return (
                  <div className="occupant-card-container">
                    <OccupantCard
                      name={name}
                      type={type}
                      start={start}
                      end={end}
                      checkedIn={checkedIn}
                    />
                  </div>
                );
              })}
            </div>
          </Box>
        </ContentBlock>

        {/* Finance Details */}

        <ContentBlock
          title="Finance Details"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => setFinanceDetailsEditModalOpen(true)} />
            </IconButton>
          }
        >
          <div>
          <LabelAndValuePair label="Total Fee" value={"£" + bookingData.data.totalFee} />
          </div>

          <div>
            <LabelAndValuePair label="Total Paid" value={"£" + calculateTotalPaid(bookingData.data)} />
          </div>

          <div>
            <LabelAndValuePair label="Balance" value={"£" + calculateBalance(bookingData.data)} />
          </div>

          {/* Payments */}

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="payment table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingData.data.payments?.map((payment) => (
                  <TableRow
                    key={payment.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(payment.paymentDate).toUTCString()}
                    </TableCell>
                    <TableCell>{payment.paymentAmount}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>{payment.paymentNotes || ""}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentBlock>
      </div>

    </div>

  );
};

export default IndividualBooking;
