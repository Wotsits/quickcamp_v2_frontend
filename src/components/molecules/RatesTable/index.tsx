import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";

type RatesTableProps = {
  /** callback when a field value is changed */
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    type: "BASE" | "GUEST" | "PET" | "VEHICLE",
    perNightOrPerStay: "PER_NIGHT" | "PER_STAY"
  ) => void;
  /** ID of the base rate being displayed */
  baseRateId: number;
  /** per night value of the base rate being displayed */
  baseRatePerNight: number;
  /** per stay value of the base rate being displayed */
  baseRatePerStay: number;
  /** guest rates to be displayed in the table */
  guestRates: any; // [guestTypeName, { id, perNight, perStay }]
  /** ID of the pet rate being displayed */
  petRateId: number;
  /** per night value of the pet rate being displayed */
  petRatePerNight: number;
  /** per stay value of the pet rate being displayed */
  petRatePerStay: number;
  /** ID of the vehicle rate being displayed */
  vehicleRateId: number;
  /** per night value of the vehicle rate being displayed */
  vehicleRatePerNight: number;
  /** per stay value of the vehicle rate being displayed */
  vehicleRatePerStay: number;
  /** optional, boolean flag controlling whether the content of the table is editable */
  contentEditable?: boolean;
};

const RatesTable = ({
  contentEditable = false,
  handleChange,
  baseRateId,
  baseRatePerNight,
  baseRatePerStay,
  guestRates,
  petRateId,
  petRatePerNight,
  petRatePerStay,
  vehicleRateId,
  vehicleRatePerNight,
  vehicleRatePerStay,
}: RatesTableProps) => {
  return (
    <div className={"rates-table"}>
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
            <TableCell>
              {contentEditable ? (
                <TextField
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, baseRateId, "BASE", "PER_NIGHT");
                  }}
                  defaultValue={baseRatePerNight.toFixed(2)}
                />
              ) : (
                baseRatePerNight.toFixed(2)
              )}
            </TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, baseRateId, "BASE", "PER_STAY");
                  }}
                  defaultValue={baseRatePerStay.toFixed(2)}
                />
              ) : (
                baseRatePerStay.toFixed(2)
              )}
            </TableCell>
          </TableRow>
          {guestRates.map(
            (
              guestRate: [
                string,
                { id: number; perNight: number; perStay: number }
              ]
            ) => {
              const guestTypeName = guestRate[0];
              const guestTypeRateId = guestRate[1].id;
              const guestTypeRatePerNight = guestRate[1].perNight.toFixed(2);
              const guestTypeRatePerStay = guestRate[1].perStay.toFixed(2);

              return (
                <TableRow key={guestTypeName}>
                  <TableCell>{guestTypeName}</TableCell>
                  <TableCell>
                    {contentEditable ? (
                      <TextField
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(
                            e,
                            guestTypeRateId,
                            "GUEST",
                            "PER_NIGHT"
                          );
                        }}
                        defaultValue={guestTypeRatePerNight}
                      />
                    ) : (
                      guestTypeRatePerNight
                    )}
                  </TableCell>
                  <TableCell>
                    {contentEditable ? (
                      <TextField
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e, guestTypeRateId, "GUEST", "PER_STAY");
                        }}
                        defaultValue={guestTypeRatePerStay}
                      />
                    ) : (
                      guestTypeRatePerStay
                    )}
                  </TableCell>
                </TableRow>
              );
            }
          )}
          <TableRow>
            <TableCell>Pet</TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, petRateId, "PET", "PER_NIGHT");
                  }}
                  defaultValue={petRatePerNight.toFixed(2)}
                />
              ) : (
                petRatePerNight.toFixed(2)
              )}
            </TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, petRateId, "PET", "PER_STAY");
                  }}
                  defaultValue={petRatePerStay.toFixed(2)}
                />
              ) : (
                petRatePerStay.toFixed(2)
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vehicle</TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, vehicleRateId, "VEHICLE", "PER_NIGHT");
                  }}
                  defaultValue={vehicleRatePerNight.toFixed(2)}
                />
              ) : (
                vehicleRatePerNight.toFixed(2)
              )}
            </TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, vehicleRateId, "VEHICLE", "PER_STAY");
                  }}
                  defaultValue={vehicleRatePerStay.toFixed(2)}
                />
              ) : (
                vehicleRatePerStay.toFixed(2)
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default RatesTable;
