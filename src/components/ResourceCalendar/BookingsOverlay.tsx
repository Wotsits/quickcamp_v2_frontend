import React from 'react';
import { BookingSumm } from './types';
import BookingBlock from './BookingBlock';
import { isBookingForDate } from '../../utils/helpers';

type BookingOverlayComponentProps = {
    /** mandatory, bookings array */
    bookings: BookingSumm[],
    /** mandatory, cells array */
    cells: HTMLTableCellElement[]
    /** mandatory, column width */
    columnWidth: number
}

const BookingsOverlay = ({bookings, cells, columnWidth}: BookingOverlayComponentProps) => {

    // --------------
    // HELPER
    // --------------

    function getPosition(booking: BookingSumm) {
        const unitId = booking.unit;
        const start = booking.start;
        const end = booking.end;
        const cellToOverlay = cells.find(cell => {
            const unitMatches = parseInt((cell.dataset.unit as string)) === unitId
            const dateMatches = isBookingForDate(new Date(cell.dataset.midpoint as string), new Date(start), new Date(end))
            return unitMatches && dateMatches
        })
        const x = cellToOverlay?.getBoundingClientRect().x + "px"
        const y = cellToOverlay?.getBoundingClientRect().y + "px"
        const startDateOfCellToOverlay = new Date(cellToOverlay?.dataset.start as string)
        const numberOfNightsRemaining = Math.ceil((new Date(end).getTime() - startDateOfCellToOverlay.getTime()) / (1000 * 60 * 60 * 24))
        return {x, y, numberOfNightsRemaining}
    }

    // --------------
    // RENDER
    // --------------

    if (!cells) {
        return null
    }

    return bookings.map(booking => {
        const {x, y, numberOfNightsRemaining} = getPosition(booking)
        return (
            <BookingBlock key={booking.id} booking={booking} positionLeft={x} positionTop={y} columnWidth={columnWidth} numberOfNightsRemaining={numberOfNightsRemaining}/>
        )
      })

}

export default BookingsOverlay