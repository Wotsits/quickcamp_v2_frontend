export type Tenant = {
    id: number,
    name: string
    sites: Site[]
}

export type Site = {
    id: number,
    name: string,
    tenantId: number
    tenant: Tenant
}

export type User = {
    email: string,
    password: string,
    tenantId: number,
    tenant: Tenant
    name: string,
    roles: Role[],
}

export type Role = {
    id: number,
    role: string,
    users: User[]
}

export type UnitType = {
    id: number,
    name: string,
    siteId: number
    units: Unit[]
}

export type Unit = {
    id: number,
    name: string,
    unitTypeId: number
}

export type Guest = {
    id: number,
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    townCity: string,
    postcode: string,
    tel: string,
    email: string,
    password: string
}

export type Vehicle = {
    id: number,
    vehReg: string
}

export type Pet = {
    id: number,
    name: string
}

export type Booking = {
    id: number,
    start: Date,
    end: Date,
    unitId: number, 
    totalFee: number,
    leadGuestId: number,
}

export type Calendar = {
    id: string,
    date: Date,
    unitId: number,
    bookingId?: number
}

export type BookingGuestMap = {
    id: number,
    bookingId: number,
    guestId: number,
    start: Date,
    end: Date
}

export type BookingVehicleMap = {
    id: number,
    bookingId: number,
    vehicleId: number,
    start: Date,
    end: Date
}

export type BookingPetMap = {
    id: number,
    bookingId: number,
    petId: number,
    start: Date,
    end: Date
}

export type Payment = {
    id: number,
    createdAt: Date,
    bookingId: number,
    amount: number
}

export type BookingSumm = {
    id: any;
    bookingName: string;
    adults: number;
    children: number;
    infants: number;
    pets: number;
    vehicles: number;
    unit: number;
    start: string;
    end: string;
    paid: boolean;
    peopleCheckedIn: number;
    petsCheckedIn: number;
    vehiclesCheckedIn: number;
  };

  export type UserResponse = {
    message: string;
    name: string;
    refreshToken: string;
    roles: Role[];
    sites: Site[];
    tenantId: number;
    token: string;
    username: string;
  }