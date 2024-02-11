import { BookingGuest } from "../../types";

export function checkoutOne(
  guestId: number,
  type: "GUEST" | "PET" | "VEHICLE",
  state: BookingGuest[],
  setState:React.Dispatch<React.SetStateAction<BookingGuest[] | undefined>>,
  mutationFunc: any,
  token: string,
  reverse: boolean
) {
  const now = new Date();

  // @ts-ignore - needed because there is no way of matching the state shape against the setState function shape
  const cpy: BookingGuest[] | BookingPet[] | BookingVehicle[] = [...state];

  const target = cpy.find((item) => item.id === guestId);

  if (target) {
    if (target.checkedIn) {
      target.checkedOut = !reverse ? now : null;
    }
  }

  // @ts-ignore - needed because there is no way of matching the state shape against the setState function shape
  setState(cpy);

  // Update the server
  mutationFunc.mutate({ token, id: guestId, type, reverse });
}

export function checkoutAll(
  guestState: BookingGuest[],
  setGuestState: React.Dispatch<React.SetStateAction<BookingGuest[] | undefined>>,
  mutationFunc: any,
  token: string,
  reverse: boolean
) {
  const now = new Date();

  const guestStateCpy = [...guestState];

  const toUpdateOnServer: { id: number; type: "GUEST" | "PET" | "VEHICLE" }[] =
    [];

  guestStateCpy.forEach((guest) => {
    if (guest.checkedIn) {
      guest.checkedOut = !reverse ? now : null;
      toUpdateOnServer.push({ id: guest.id, type: "GUEST" });
    }
  });

  setGuestState(guestState);

  // Update the server
  mutationFunc.mutate({
    token,
    guests: toUpdateOnServer,
    reverse,
  });
}

