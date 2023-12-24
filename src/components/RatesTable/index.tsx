import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

type RatesTableProps = {
  baseRate: { perNight: number; perStay: number } | null;
  guestRates: any; // [guestTypeName, { perNight, perStay }]
  petRate: { perNight: number; perStay: number } | null;
  vehicleRate: { perNight: number; perStay: number } | null;
};

const RatesTable = ({
  baseRate,
  guestRates,
  petRate,
  vehicleRate,
}: RatesTableProps) => {
  if (!baseRate) return <div>No base rate</div>;
  if (!guestRates) return <div>No guest rates</div>;
  if (!petRate) return <div>No pet rate</div>;
  if (!vehicleRate) return <div>No vehicle rate</div>;

  return (
    <div className="rates-table">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Per Night</TableCell>
                    <TableCell>Per Stay</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Base Rate</TableCell>
                    <TableCell>£{baseRate.perNight.toFixed(2)}</TableCell>
                    <TableCell>£{baseRate.perStay.toFixed(2)}</TableCell>
                </TableRow>
                {guestRates.map((guestRate: [string, {perNight: number, perStay: number}]) => (
                    <TableRow key={guestRate[0]}>
                        <TableCell>{guestRate[0]}</TableCell>
                        <TableCell>£{guestRate[1].perNight.toFixed(2)}</TableCell>
                        <TableCell>£{guestRate[1].perStay.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell>Pet</TableCell>
                    <TableCell>£{petRate.perNight.toFixed(2)}</TableCell>
                    <TableCell>£{petRate.perStay.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>£{vehicleRate.perNight.toFixed(2)}</TableCell>
                    <TableCell>£{vehicleRate.perStay.toFixed(2)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  );
};

export default RatesTable;