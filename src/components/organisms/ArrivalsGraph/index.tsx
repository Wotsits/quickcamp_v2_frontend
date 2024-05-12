import React from "react";
import { PRIMARYCOLOR } from "../../../settings";
import { LineChart } from "@mui/x-charts";
import { Booking } from "../../../types";

type ArrivalsGraphProps = {
  /** array of bookings */
  arrivalsData?: Booking[];
  /** optional, padding in px.  If not defined, the chart will have no padding */
  padding?: number;
  /** optional, height in px.  If not defined, the chart will take up the height of the parent */
  height?: number;
  /** optional, width in px.  If not defined, the chart will take up the width of the parent */
  width?: number;
};

const xAxis = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
  "01:00",
  "02:00",
];

const ArrivalsGraph = ({ arrivalsData, padding, height, width }: ArrivalsGraphProps) => {
  if (!arrivalsData) return null;

  // the points on the Y axis all set to zero.
  const yAxis = xAxis.map((xAxis) => 0);
  // iterate through the arrivals and add to the yAxis array.
  arrivalsData.forEach((arrival) => {
    const { guests } = arrival;
    if (!guests) return;
    guests.forEach((guest) => {
      const { arrivalTime } = guest;
      if (!arrivalTime) return;
      const indexOfTime = xAxis.findIndex((time) => time === arrivalTime);
      if (indexOfTime === -1) return;
      yAxis[indexOfTime] += 1;
    });
  });

  // -------------
  // RENDER
  // -------------

  return (
    <div className="arrivals-chart">
      <LineChart
            xAxis={[{ scaleType: "band", data: [...xAxis] }]}
            yAxis={[{ min: 0, max: Math.max(...yAxis) || 1, tickMinStep: 1 }]}
            series={[
              {
                data: yAxis,
                area: true,
                showMark: false
              },
            ]}
            height={height}
            width={width}
            colors={[PRIMARYCOLOR]}
            sx={{ padding }}
          />
    </div>
   
  );
};

export default ArrivalsGraph;
