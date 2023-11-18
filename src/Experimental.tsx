import React from "react";
import OccupantCard from "./components/OccupantCard";
import { OFFICIALLY_SUPPORTED_OCCUPANT_TYPES } from "./settings";

const Experimental = () => {
  return (
    <>
      <OccupantCard
        name="John Doe"
        type={OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.ADULT}
        start={new Date()}
        end={new Date()}
        checkedIn={true}
      />
      <OccupantCard
        name="Jane Doe"
        type={OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.CHILD}
        start={new Date()}
        end={new Date()}
        checkedIn={false}
      />
      <OccupantCard
        name="Jenny Doe"
        type={OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.INFANT}
        start={new Date()}
        end={new Date()}
        checkedIn={false}
    />
      <OccupantCard
        name="Jane Doe"
        type={OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.PET}
        start={new Date()}
        end={new Date()}
        checkedIn={false}
      />
    </>
  );
};

export default Experimental;
