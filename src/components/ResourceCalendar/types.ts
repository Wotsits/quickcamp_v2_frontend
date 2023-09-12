export type Resource = {
  id: any;
  name: string;
};

export type ResourceGroup = {
  class: string;
  resources: Resource[];
};

export type Booking = {
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
