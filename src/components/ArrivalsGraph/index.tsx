import React from "react";
import { PRIMARYCOLOR } from "../../settings";
import { LineChart } from "@mui/x-charts";
import { Booking } from "../../types";

type ArrivalsDataProps = {
  arrivalsData?: Booking[];
  padding?: number;
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

const ArrivalsGraph = ({ arrivalsData, padding }: ArrivalsDataProps) => {
  if (!arrivalsData) return null;

  // the points on the Y axis all set to zero.
  const yAxis = xAxis.map((xAxis) => 0);
  // iterate through the arrivals and add to the yAxis array.
  arrivalsData.forEach((arrival) => {
    const { vehicles } = arrival;
    if (!vehicles) return;
    vehicles.forEach((vehicle) => {
      const { expectedArrival } = vehicle;
      if (!expectedArrival) return;
      const indexOfTime = xAxis.findIndex((time) => time === expectedArrival);
      if (indexOfTime === -1) return;
      yAxis[indexOfTime] += 1;
    });
  });

  // -------------
  // RENDER
  // -------------

  return (
    <LineChart
      xAxis={[{ scaleType: "band", data: [...xAxis] }]}
      yAxis={[{ min: 0, max: Math.max(...yAxis) || 1, tickMinStep: 1 }]}
      series={[
        {
          data: yAxis,
          area: true,
        },
      ]}
      width={500}
      height={300}
      colors={[PRIMARYCOLOR]}
      sx={{ padding }}
    />
  );
};

export default ArrivalsGraph;