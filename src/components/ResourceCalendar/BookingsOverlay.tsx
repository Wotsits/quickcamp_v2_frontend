import React from 'react';
import { Booking } from './types';
import BookingBlock from './BookingBlock';
import { isSameDate } from '../../utils/helpers';

type BookingOverlayComponentProps = {
    /** mandatory, bookings array */
    bookings: Booking[],
    /** mandatory, cells array */
    cells: HTMLTableCellElement[]
    /** mandatory, column width */
    columnWidth: number
}

const BookingsOverlay = ({bookings, cells, columnWidth}: BookingOverlayComponentProps) => {

    // --------------
    // HELPER
    // --------------

    function getPosition(booking: Booking) {
        const unitId = booking.unit;
        const start = booking.start;
        const cellToOverlay = cells.find(cell => {
            const unitMatches = parseInt((cell.dataset.unit as string)) === unitId
            const dateMatches = isSameDate(new Date(cell.dataset.start as string), new Date(start))
            return unitMatches && dateMatches
        })
        const x = cellToOverlay?.getBoundingClientRect().x + "px"
        const y = cellToOverlay?.getBoundingClientRect().y + "px"
        return {x, y}
    }

    // --------------
    // RENDER
    // --------------

    if (!cells) {
        return null
    }

    return bookings.map(booking => {
        const {x,y} = getPosition(booking)
        return (
            <BookingBlock key={booking.id} booking={booking} positionLeft={x} positionTop={y} columnWidth={columnWidth} />
        )
      })

}

export default BookingsOverlay