import React from "react";
import { Box, SvgIcon, Typography } from "@mui/material";
import AddRemove from "../AddRemove";
import Adult from "../Icons/Adult";
import Child from "../Icons/Child";
import Infant from "../Icons/Infant";
import Youth from "../Icons/Youth";
import Old from "../Icons/Old";
import Pet from "../Icons/Pet";
import Car from "../Icons/Car";

const OccupantDetails = () => {
  return (
    <Box id="occupant-details">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Booking Details
      </Typography>
      <div id="occupant-numbers">
        <div id="occupant-numbers-top">
          <div id="adult-numbers">
            <AddRemove
              callbackOnMinus={() => console.log("minus")}
              callbackOnPlus={() => console.log("plus")}
            >
              <SvgIcon fontSize="large" color="primary" component={Adult} />
            </AddRemove>
          </div>
          <div id="child-numbers">
            <AddRemove
              callbackOnMinus={() => console.log("minus")}
              callbackOnPlus={() => console.log("plus")}
            >
              <SvgIcon fontSize="large" color="primary" component={Child} />
            </AddRemove>
          </div>

          <div id="infant-numbers">
            <AddRemove
              callbackOnMinus={() => console.log("minus")}
              callbackOnPlus={() => console.log("plus")}
            >
              <SvgIcon fontSize="large" color="primary" component={Infant} />
            </AddRemove>
          </div>
        </div>
        <div id="occupant-numbers-middle">
          <div id="youth-numbers">
            <AddRemove
              callbackOnMinus={() => console.log("minus")}
              callbackOnPlus={() => console.log("plus")}
            >
                <SvgIcon fontSize="large" color="primary" component={Youth} />
            </AddRemove>
          </div>
          <div id="oap-numbers">
            <AddRemove
              callbackOnMinus={() => console.log("minus")}
              callbackOnPlus={() => console.log("plus")}
            >
              <SvgIcon fontSize="large" color="primary" component={Old} />
            </AddRemove>
          </div>
        </div>
        <div id="occupant-numbers-bottom">
          <div id="pet-numbers">
            <AddRemove
              callbackOnMinus={() => console.log("minus")}
              callbackOnPlus={() => console.log("plus")}
            >
              <SvgIcon fontSize="large" color="primary" component={Pet} />
            </AddRemove>
          </div>
          <div id="vehicle-numbers">
            <AddRemove
              callbackOnMinus={() => console.log("minus")}
              callbackOnPlus={() => console.log("plus")}
            >
              <SvgIcon fontSize="large" color="primary" component={Car} />
            </AddRemove>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default OccupantDetails;
