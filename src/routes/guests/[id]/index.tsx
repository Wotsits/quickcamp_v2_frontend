import React, { useContext, useState } from 'react';
import AuthContext from '../../../contexts/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import PageHeader from '../../../components/PageHeader';
import ContentBlock from '../../../components/ContentBlock';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { LeadGuest } from '../../../types';
import EditIcon from '@mui/icons-material/Edit';
import { getLeadGuestById } from '../../../services/queries/getLeadGuestById';
import { ROUTES } from '../../../settings';
import { generateStandardizedDateFormat } from '../../../utils/dateTimeManipulation';

const IndividualLeadGuest = () => {

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
    return <div>Lead Guest ID not found</div>;
  }

  const id = parseInt(params.id);

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data: leadGuestData, error } = useQuery<{data: LeadGuest}, Error>(
    ["lead-guest", id],
    () => getLeadGuestById({ token: user.token, id: id })
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

  if (!leadGuestData) {
    return <div>Lead Guest not found</div>;
  }

  return (
    <div id="lead-guest">

      <PageHeader title="Lead Guest" subTitle={`Guest ID: ${leadGuestData.data.id}`} />

      <div id="lead-guest-information-container">
        {/* Lead Guest Details */}

        <ContentBlock
          title="Name Details"
          topRightComponent={
            <IconButton>
              <EditIcon onClick={() => {}} />
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
                    <EditIcon onClick={() => {}} />
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
                    <EditIcon onClick={() => {}} />
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

        <ContentBlock
            title="Notes"
            topRightComponent={
                <IconButton>
                    <EditIcon onClick={() => {}} />
                </IconButton>
            }
        >
            <Typography variant="body1" gutterBottom>
                Guest Notes here
            </Typography>
        </ContentBlock>

        <ContentBlock
            title="Bookings"
        >
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
                            {leadGuestData.data.bookings && leadGuestData.data.bookings.map((booking) => {
                                return (
                                    <TableRow className='clickable' onClick={() => navigate(ROUTES.ROOT + ROUTES.BOOKINGS + booking.id)}>
                                        <TableCell>{booking.id}</TableCell>
                                        <TableCell>{generateStandardizedDateFormat(booking.start)}</TableCell>
                                        <TableCell>{generateStandardizedDateFormat(booking.end)}</TableCell>
                                        <TableCell>{booking.unit.name}</TableCell>
                                        <TableCell>{booking.unit.unitType!.name}</TableCell>
                                        <TableCell>£{booking.totalFee}</TableCell>
                                        <TableCell>{booking.status}</TableCell>
                                    </TableRow>
                                )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>
        </ContentBlock>

    </div>

    </div>

  );
};

export default IndividualLeadGuest;