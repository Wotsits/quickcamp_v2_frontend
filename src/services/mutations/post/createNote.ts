import axios from "axios";
import { APIURL } from "../../../settings";

type CreateNoteArgs = {
  token: string;
  content: string;
  noteType: "PUBLIC" | "PRIVATE";
  leadGuestId?: number;
  bookingId?: number;
  paymentId?: number;
  bookingGuestId?: number;
  bookingPetId?: number;
  bookingVehicleId?: number;
};

export const createNote = async ({
  token,
  content,
  noteType,
  leadGuestId,
  bookingId,
  paymentId,
  bookingGuestId,
  bookingPetId,
  bookingVehicleId,
}: CreateNoteArgs) => {
  return await axios.post(
    APIURL + "new-note",
    {
      content,
      noteType,
      leadGuestId,
      bookingId,
      paymentId,
      bookingGuestId,
      bookingPetId,
      bookingVehicleId,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
