import { BookingGuest, BookingPet, BookingVehicle } from "../../types";
import { isGuestDue } from "../../utils/helpers";

export function checkinOne(
  guestId: number,
  type: "GUEST" | "PET" | "VEHICLE",
  state: BookingGuest[] | BookingPet[] | BookingVehicle[],
  setState:
    | React.Dispatch<React.SetStateAction<BookingGuest[] | undefined>>
    | React.Dispatch<React.SetStateAction<BookingPet[] | undefined>>
    | React.Dispatch<React.SetStateAction<BookingVehicle[] | undefined>>,
  mutationFunc: any,
  token: string,
  reverse: boolean
) {
  const now = new Date();

  // @ts-ignore - needed because there is no way of matching the state shape against the setState function shape
  const cpy: BookingGuest[] | BookingPet[] | BookingVehicle[] = [...state];

  const target = cpy.find((item) => item.id === guestId);

  if (target) {
    if (isGuestDue(target)) {
      target.checkedIn = !reverse ? now : null;
    }
  }

  // @ts-ignore - needed because there is no way of matching the state shape against the setState function shape
  setState(cpy);

  // Update the server
  mutationFunc.mutate({ token, id: guestId, type, reverse });
}

export function checkinAll(
  guestState: BookingGuest[],
  setGuestState: React.Dispatch<React.SetStateAction<BookingGuest[] | undefined>>,
  petState: BookingPet[],
  setPetState: React.Dispatch<React.SetStateAction<BookingPet[] | undefined>>,
  vehicleState: BookingVehicle[],
  setVehicleState: React.Dispatch<React.SetStateAction<BookingVehicle[] | undefined>>,
  checkInManyGuestsMutation: any,
  token: string,
  reverse: boolean
) {
  const now = new Date();

  const guestStateCpy = [...guestState];
  const petStateCpy = [...petState];
  const vehicleStateCpy = [...vehicleState];

  const toUpdateOnServer: { id: number; type: "GUEST" | "PET" | "VEHICLE" }[] =
    [];

  guestStateCpy.forEach((guest) => {
    if (isGuestDue(guest)) {
      if (!guest.checkedIn) {
        guest.checkedIn = !reverse ? now : null;
        toUpdateOnServer.push({ id: guest.id, type: "GUEST" });
      }
    }
  });
  petStateCpy.forEach((pet) => {
    if (isGuestDue(pet)) {
      if (!pet.checkedIn) {
        pet.checkedIn = !reverse ? now : null;
        toUpdateOnServer.push({ id: pet.id, type: "PET" });
      }
    }
  });
  vehicleStateCpy.forEach((vehicle) => {
    if (isGuestDue(vehicle)) {
      if (!vehicle.checkedIn) {
        vehicle.checkedIn = !reverse ? now : null;
        toUpdateOnServer.push({ id: vehicle.id, type: "VEHICLE" });
      }
    }
  });

  setGuestState(guestState);
  setPetState(petState);
  setVehicleState(vehicleState);

  // Update the server
  checkInManyGuestsMutation.mutate({
    token,
    guests: toUpdateOnServer,
    reverse,
  });
}
