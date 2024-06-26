import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { GuestRatesSummary } from "../../../types";

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
  guestRates: GuestRatesSummary;
  /** optional, boolean flag controlling whether the content of the table is editable */
  contentEditable?: boolean;
};

const RatesTable = ({
  contentEditable = false,
  handleChange,
  baseRateId,
  baseRatePerNight,
  baseRatePerStay,
  guestRates
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
          {guestRates.map(guestRate => {
              const guestTypeName = guestRate.guestTypeName;
              const guestTypeRateId = guestRate.guestTypeId;
              const guestTypeRatePerNight = guestRate.rate.perNight.toFixed(2);
              const guestTypeRatePerStay = guestRate.rate.perStay.toFixed(2);

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
        </TableBody>
      </Table>
    </div>
  );
};

export default RatesTable;
