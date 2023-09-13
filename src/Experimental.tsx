import React from 'react';
import ResourceCalendar from './components/ResourceCalendar';

const resources = [
    {
        class: "Gold",
        resources: [
            {
                id: 1,
                name: "Unit 1"
            },
            {
                id: 2,
                name: "Unit 2"
            },
            {
                id: 3,
                name: "Unit 3"
            },
            {
                id: 4,
                name: "Unit 4"
            },
        ]
    },
    {
        class: "Silver",
        resources: [
            {
                id: 5,
                name: "Unit 5"
            },
            {
                id: 6,
                name: "Unit 6"
            },
        ]
    }
]

const bookings = [
    {
        id: 1,
        bookingName: "Smith",
        adults: 2,
        children: 2,
        infants: 0,
        pets: 1,
        vehicles: 2,
        unit: 1,
        start: "2023-09-13T12:00:00",
        end: "2023-09-15T11:59:59",
        paid: true,
        peopleCheckedIn: 2,
        petsCheckedIn: 1,
        vehiclesCheckedIn: 1
    },
    {
        id: 2,
        bookingName: "Jones",
        adults: 4,
        children: 0,
        infants: 0,
        pets: 0,
        vehicles: 2,
        unit: 3,
        start: "2023-09-14T12:00:00",
        end: "2023-09-15T11:59:59",
        paid: false,
        peopleCheckedIn: 0,
        petsCheckedIn: 0,
        vehiclesCheckedIn: 0
    },
    {
        id: 3,
        bookingName: "Williams",
        adults: 6,
        children: 2,
        infants: 0,
        pets: 0,
        vehicles: 2,
        unit: 4,
        start: "2023-09-13T12:00:00",
        end: "2023-09-14T11:59:59",
        paid: true,
        peopleCheckedIn: 8,
        petsCheckedIn: 0,
        vehiclesCheckedIn: 2
    },
    {
        id: 4,
        bookingName: "Robins",
        adults: 6,
        children: 2,
        infants: 0,
        pets: 0,
        vehicles: 2,
        unit: 2,
        start: "2023-09-12T12:00:00",
        end: "2023-09-14T11:59:59",
        paid: true,
        peopleCheckedIn: 8,
        petsCheckedIn: 0,
        vehiclesCheckedIn: 2
    },
]

const Experimental = () => {
    return (
        <ResourceCalendar resources={resources} bookings={bookings}/>
    )
}

export default Experimental;