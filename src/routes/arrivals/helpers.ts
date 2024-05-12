import { Booking, BookingGuest} from "../../types";
import { setDateToMidday } from "../../utils/dateTimeManipulation";
import { isGuestDue } from "../../utils/helpers";

export function checkinOne(
  guestId: number,
  type: "GUEST" | "PET" | "VEHICLE",
  state: BookingGuest[],
  setState: React.Dispatch<React.SetStateAction<BookingGuest[] | undefined>>,
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
  checkInManyGuestsMutation: any,
  token: string,
  reverse: boolean
) {

  const now = new Date();

  const guestStateCpy = [...guestState];

  const toUpdateOnServer: { id: number; type: "GUEST" | "PET" | "VEHICLE" }[] =
    [];

  guestStateCpy.forEach((guest) => {
    if (isGuestDue(guest) && !guest.checkedOut) {
      if (!reverse) {
        if (!guest.checkedIn) {
          guest.checkedIn = now;
          toUpdateOnServer.push({ id: guest.id, type: "GUEST" });
        }
      }
      else {
        if (guest.checkedIn && !guest.checkedOut) {
          guest.checkedIn = null;
          toUpdateOnServer.push({ id: guest.id, type: "GUEST" });
        }
      }
    }
  });

  setGuestState(guestState);

  // Update the server
  checkInManyGuestsMutation.mutate({
    token,
    guests: toUpdateOnServer,
    reverse,
  });
}

export function countTotalToday(
  array: Booking["guests"],
  status: "CHECKED-IN" | "DUE",
  today: Date
) {
  if (!array) return 0;
  if (!status) return array.length;
  if (!today) return array.length;

  const arrivingToday = array.filter((item) => {
    const arrivalDate = new Date(item.start);
    return (
      arrivalDate.getDate() === today.getDate() &&
      arrivalDate.getMonth() === today.getMonth() &&
      arrivalDate.getFullYear() === today.getFullYear()
    );
  });

  if (status === "CHECKED-IN") {
    return arrivingToday.filter((item) => item.checkedIn).length;
  }
  if (status === "DUE") {
    return arrivingToday.length;
  }
  return 0;
}

/**
 * @description This function takes in a guestTypeGroupId, a list of a bookings and a string indicating what should be counted.  
 * @returns : number - Total guests of the given guestTypeGroup who hare either due (total) or arrived.
 */
export function calculateNumberOfType(guestTypeGroupId: number, bookings: Booking[], dueOrArrived: "DUE" | "ARRIVED"): number {
  if (!bookings || bookings.length === 0) return 0;

  let total = 0
  bookings.forEach(arrival => {
    const guests = arrival.guests
    if (!guests || guests.length === 0) {
      return
    }
    guests.forEach(guest => {
      const guestType = guest.guestType
      const guestTypeGroup = guestType?.guestTypeGroup
      if (!guestTypeGroup) return
      if (guestTypeGroup.id === guestTypeGroupId) {
        if (dueOrArrived === "DUE") total += 1
        if (dueOrArrived === "ARRIVED") {
          if (guest.checkedIn) {
            total += 1
          }
        }
      }
    })
  })

  return total
}
