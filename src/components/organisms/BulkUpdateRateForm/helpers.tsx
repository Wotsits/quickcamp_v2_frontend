import {
  BulkRateUpdateObj,
  GuestType,
  SimpleRate,
  UnitType,
} from "../../../types";

/*
  Creates a form state object that looks like this:
  [
    {
      unitTypeId: 1,
      rates: {
        "BASE": [
          {
            guestTypeId: undefined,
            perNight: 0,
            perStay: 0
          }
        ],
        "GUEST": [
          {
            guestTypeId: 1,
            guestTypeName: "Adult",
            perNight: 0,
            perStay: 0,
          },
          {
            guestTypeId: 2,
            guestTypeName: "Child",
            perNight: 0,
            perStay: 0,
          },
          {
            guestTypeId: 3,
            guestTypeName: "Infant",
            perNight: 0,
            perStay: 0,
          },
        ],
        "PET": [
          { 
            guestTypeId: undefined,
            perNight: 0,
            perStay: 0
          }
        ],
        "VEHICLE": [
          {
            guestTypeId: undefined,
            perNight: 0,
            perStay: 0
          }
        ]
      }
    }
  ]
   
  */

export function generateFormState(
  unitTypes: UnitType[],
  guestTypes: GuestType[]
) {
  let newFormState: BulkRateUpdateObj = [];
  unitTypes.forEach((unitType, index) => {
    // push on an object for each unit type.  This is the struct which will hold the rates.
    newFormState.push({
      unitTypeId: unitType.id,
      unitTypeName: unitType.name,
      rates: {
        base: {} as SimpleRate,
        guest: [],
        pet: {} as SimpleRate,
        vehicle: {} as SimpleRate,
      },
    });
    newFormState[index].rates.base = {
      id: -1,
      perNight: 0,
      perStay: 0,
    };
    guestTypes.forEach((guestType) => {
      newFormState[index].rates.guest.push({
        guestTypeId: guestType.id,
        guestTypeName: guestType.name,
        rate: {
          id: -1,
          perNight: 0,
          perStay: 0,
        },
      });
    });
    newFormState[index].rates.pet = {
      id: -1,
      perNight: 0,
      perStay: 0,
    };
    newFormState[index].rates.vehicle = {
      id: -1,
      perNight: 0,
      perStay: 0,
    };
  });
  return newFormState;
}
