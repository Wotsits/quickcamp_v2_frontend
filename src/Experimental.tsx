import React from "react";
import OccupantCard from "./components/OccupantCard";

const Experimental = () => {
  return (
    <>
      <OccupantCard
        name="John Doe"
        type="Adult"
        start={new Date()}
        end={new Date()}
        checkedIn={true}
      />
      <OccupantCard
        name="Jane Doe"
        type="Pet"
        start={new Date()}
        end={new Date()}
        checkedIn={false}
      />
    </>
  );
};

export default Experimental;
