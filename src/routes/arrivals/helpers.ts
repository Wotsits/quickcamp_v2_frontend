import { BookingGuest} from "../../types";
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
