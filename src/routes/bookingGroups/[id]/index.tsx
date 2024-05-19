import React, { useContext } from 'react';
import PageHeader from '../../../components/molecules/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AuthContext from '../../../contexts/authContext';
import { getBookingGroupById } from '../../../services/queries/getBookingGroupById';
import { BookingGroup } from '../../../types';
import ContentBlock from '../../../components/atoms/ContentBlock';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SiteContext from '../../../contexts/sitesContext';
import { ROUTES } from '../../../settings';
import TablePaginationControls from '../../../components/atoms/Table/TablePaginationControls';

export const IndividualBookingGroup = () => {
    // -----------
    // CONTEXT
    // -----------

    const { user } = useContext(AuthContext)
    const { selectedSite } = useContext(SiteContext)

    // -----------
    // HOOKS
    // -----------

    const params = useParams();

    if (!params || !params.id) {
        return <div>BookingGroupId not found</div>;
    }

    const id = parseInt(params.id);

    const navigate = useNavigate();

    // -----------
    // QUERIES
    // -----------

    const { isLoading, isError, data: bookingGroupData, error } = useQuery<{ data: BookingGroup }, Error>(
        ["bookinggGroup", id],
        () => getBookingGroupById({ token: user.token, id: id })
    );

    // ----------
    // RENDER
    // ----------

    if (isLoading) return <div>Loading... </div>

    if (isError) return <div>{error.message}</div>

    return <div className="individual-booking-group">
        <PageHeader title="Booking Group" subTitle={`Booking Group ID: ${bookingGroupData!.data.id}`} />

        <div id="booking-group-information-container">
            {/* Lead Guest Details */}

            <ContentBlock
                title="Bookings"
            >
                <TableContainer sx={{ minWidth: "600px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Lead Guest Name</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Fee</TableCell>
                                {selectedSite?.guestTypeGroups?.map(guestType => {
                                    return (
                                        <TableCell key={guestType.id}>
                                            {guestType.name}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingGroupData?.data.bookings.map(booking => {
                                return (
                                    <TableRow
                                        key={booking.id}
                                        className="clickable"
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        onClick={() =>
                                            navigate(
                                                ROUTES.ROOT + ROUTES.BOOKINGS + booking.id
                                            )
                                        }
                                        hover
                                    >
                                        <TableCell>{booking.id}</TableCell>
                                        <TableCell>{booking.leadGuest.firstName + " " + booking.leadGuest.lastName}</TableCell>
                                        <TableCell>{booking.unit.name}</TableCell>
                                        <TableCell>{new Date(booking.start).toDateString() + ", " + new Date(booking.start).toLocaleTimeString()}</TableCell>
                                        <TableCell>{new Date(booking.end).toDateString() + ", " + new Date(booking.end).toLocaleTimeString()}</TableCell>
                                        <TableCell>{"£" + booking.totalFee}</TableCell>
                                        {selectedSite!.guestTypeGroups!.map(guestType => {
                                            return (
                                                <TableCell key={guestType.id}>
                                                    {booking.guests!.filter(
                                                        guest => guest.guestTypeId === guestType.id
                                                    )?.length}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContentBlock >
        </div>
    </div>
}