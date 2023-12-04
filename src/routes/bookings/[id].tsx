import { Box, Icon, IconButton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { Booking } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import "./style.css";
import OccupantCard from "../../components/OccupantCard";
import { OFFICIALLY_SUPPORTED_OCCUPANT_TYPES } from "../../settings";
import PageHeader from "../../components/PageHeader";
import EditIcon from "@mui/icons-material/Edit";
import ContentBlock from "../../components/ContentBlock";
import Modal, { ModalHeader } from "../../components/Modal";
import CloseIcon from '@mui/icons-material/Close';

const IndividualBooking = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

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

  const { isLoading, isError, data, error } = useQuery<Booking, Error>(
    ["booking", params.id],
    () => getBookingById({ token: user.token, id: id })
  );

  // -------------
  // RENDER
  // -------------

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Booking not found</div>;
  }

  return (
    <div id="booking">

      {/* Lead Guest Edit Modal */}

      {leadGuestEditModalOpen && (
        <Modal open={true}>
          <ModalHeader
            title="Edit Lead Guest"
            onClose={() => setLeadGuestEditModalOpen(false)}
          />
          <div className="edit-lead-guest-form">
            Edit Lead Guest Form Here
          </div>
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

      <PageHeader title="Booking" subTitle={`Booking ID: ${data.id}`} />

      <div id="booking-information-container">
        {/* Lead Guest Details */}

        <ContentBlock
          title="Booking Details"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => setLeadGuestEditModalOpen(true)} />
            </IconButton>
          }
        >
          <Typography variant="body1" gutterBottom>
            Lead Guest Name: {data.leadGuest.firstName}{" "}
            {data?.leadGuest.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lead Guest Email: {data.leadGuest.email}
          </Typography>
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
          <Typography variant="body1" gutterBottom>
            Unit: {data.unit!.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Dates: {new Date(data.start).toUTCString()} -{" "}
            {new Date(data.end).toUTCString()}
          </Typography>
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
              {data.guests?.map((guest) => {
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
          <Box sx={{ mb: 3 }} justifyContent="space-between">
            <Typography variant="h6" component="h2" gutterBottom>
              Pets
            </Typography>
            <div className="occupant-cards">
              {data.pets?.map((pet) => {
                const name = pet.name;
                const start = new Date(pet.start).toUTCString();
                const end = new Date(pet.end).toUTCString();
                const checkedIn = pet.checkedIn !== null;
                return (
                  <div className="occupant-card-container">
                    <OccupantCard
                      name={name}
                      type={OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.PET}
                      start={new Date(start)}
                      end={new Date(end)}
                      checkedIn={checkedIn}
                    />
                    ;
                  </div>
                );
              })}
            </div>
          </Box>
          <Box sx={{ mb: 3 }} justifyContent="space-between">
            <Typography variant="h6" component="h2" gutterBottom>
              Vehicles
            </Typography>
            <div className="occupant-cards">
              {data.vehicles?.map((vehicle) => {
                const reg = vehicle.vehicleReg;
                const start = new Date(vehicle.start).toUTCString();
                const end = new Date(vehicle.end).toUTCString();
                const checkedIn = vehicle.checkedIn !== null;
                return (
                  <OccupantCard
                    name={reg}
                    type={OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.VEHICLE}
                    start={new Date(start)}
                    end={new Date(end)}
                    checkedIn={checkedIn}
                  />
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
          {/* Finance details here */}
        </ContentBlock>
      </div>

    </div>

  );
};

export default IndividualBooking;
