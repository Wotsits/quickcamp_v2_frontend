import React from "react";
import OccupantCard from "./components/molecules/OccupantCard";
import { OFFICIALLY_SUPPORTED_OCCUPANT_TYPES, PRIMARYCOLOR, SECONDARYCOLOR } from "./settings";
import { LineChart } from "@mui/x-charts";

function generateArrivalsData() {
  const arrivalsData: {vehicles: any[]}[] = [];
  for (let i = 0; i < 500; i++) {
    let hour = Math.floor(Math.random() * 24);
    if (i % 2 === 0) {
      hour = Math.floor(Math.random() * 4) + 19;
    }
    const arrivalHour = hour.toString().padStart(2, "0");
    const arrivalTime = `${arrivalHour}:00`;
    const vehicles: {expectedArrival: string}[] = [];
    vehicles.push({
      expectedArrival: arrivalTime,
    });
    arrivalsData.push({
      vehicles,
    });
  }
  return arrivalsData;
}

const Experimental = () => {

  const arrivalsData = generateArrivalsData()

  function generateArrivalGraph() {
    if (!arrivalsData) return null;
    // the points on the X axis.
    const xAxis = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00"];
    // the points on the Y axis all set to zero.
    const yAxis = xAxis.map((xAxis) => 0);
    // iterate through the arrivals and add to the yAxis array.
    arrivalsData.forEach(arrival => {
      const { vehicles } = arrival
      if (!vehicles) return;
      vehicles.forEach(vehicle => {
        const { expectedArrival } = vehicle;
        if (!expectedArrival) return;
        const indexOfTime = xAxis.findIndex((time) => time === expectedArrival);
        if (indexOfTime === -1) return;
        yAxis[indexOfTime] += 1;
      })
    })
    // return the chart.
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
        width={700}
        height={500}
        colors={[SECONDARYCOLOR]}
      />
    );
  }

  return (
    <div className="Experimental" style={{padding: "20px"}}>
      <h1>Experimental</h1>
      <h2>Arrivals Graph</h2>
      {generateArrivalGraph()}
    </div>
  );
};

export default Experimental;
