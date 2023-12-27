import React, { useState } from "react";
import {
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangedItems } from "../../routes/admin/sites/[id]/ratesPage";

type RatesTableProps = {
  baseRate: { id: number; perNight: number; perStay: number } | null;
  guestRates: any; // [guestTypeName, { id, perNight, perStay }]
  petRate: { id: number; perNight: number; perStay: number } | null;
  vehicleRate: { id: number; perNight: number; perStay: number } | null;
  contentEditable?: boolean;
  onCancel?: () => void;
  onSave?: (changedItems: ChangedItems) => void;
};

const RatesTable = ({
  baseRate,
  guestRates,
  petRate,
  vehicleRate,
  contentEditable = false,
  onCancel,
  onSave,
}: RatesTableProps) => {
  const [itemsChanged, setItemsChanged] = useState<
    {
      id: number;
      newValuePerNight: number | null;
      newValuePerStay: number | null;
    }[]
  >([]);

  if (contentEditable && (!onCancel || !onSave)) {
    return (
      <Alert severity="error">
        Oops! A system error has occurred. Please notify support. Error Details:
        Content editable but no onCancel & onSave events specified.
      </Alert>
    );
  }

  if (!baseRate) return <div>No base rate</div>;
  if (!guestRates) return <div>No guest rates</div>;
  if (!petRate) return <div>No pet rate</div>;
  if (!vehicleRate) return <div>No vehicle rate</div>;

  // --------
  // EVENT HANDLERS
  // --------

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    perNightOrPerStay: "PER_NIGHT" | "PER_STAY"
  ) {
    const newValue = e.target.value;

    const itemsChangedCpy = [...itemsChanged];
    const itemInArr = itemsChangedCpy.find((item) => item.id === id);
    if (!itemInArr) {
      itemsChangedCpy.push({
        id,
        newValuePerNight:
          perNightOrPerStay === "PER_NIGHT" ? Number(newValue) : null,
        newValuePerStay:
          perNightOrPerStay === "PER_STAY" ? Number(newValue) : null,
      });
    } else {
      if (perNightOrPerStay === "PER_NIGHT") {
        itemInArr.newValuePerNight = Number(newValue);
      } else {
        itemInArr.newValuePerStay = Number(newValue);
      }
    }
  }

  // --------
  // RENDER
  // --------

  const baseRateId = baseRate.id;
  const baseRatePerNight = baseRate.perNight.toFixed(2);
  const baseRatePerStay = baseRate.perStay.toFixed(2);

  const petRateId = petRate.id;
  const petRatePerNight = petRate.perNight.toFixed(2);
  const petRatePerStay = petRate.perStay.toFixed(2);

  const vehicleRateId = vehicleRate.id;
  const vehicleRatePerNight = vehicleRate.perNight.toFixed(2);
  const vehicleRatePerStay = vehicleRate.perStay.toFixed(2);

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
            <TableCell>
              {contentEditable ? (
                <TextField
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, baseRateId, "PER_NIGHT");
                  }}
                  defaultValue={baseRatePerNight}
                />
              ) : (
                baseRatePerNight
              )}
            </TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, baseRateId, "PER_STAY");
                  }}
                  defaultValue={baseRatePerStay}
                />
              ) : (
                baseRatePerStay
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e, guestTypeRateId, "PER_NIGHT");
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e, guestTypeRateId, "PER_STAY");
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, petRateId, "PER_NIGHT");
                  }}
                  defaultValue={petRatePerNight}
                />
              ) : (
                petRatePerNight
              )}
            </TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, petRateId, "PER_STAY");
                  }}
                  defaultValue={petRatePerStay}
                />
              ) : (
                petRatePerStay
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vehicle</TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, vehicleRateId, "PER_NIGHT");
                  }}
                  defaultValue={vehicleRatePerNight}
                />
              ) : (
                vehicleRatePerNight
              )}
            </TableCell>
            <TableCell>
              {contentEditable ? (
                <TextField
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, vehicleRate.id, "PER_STAY");
                  }}
                  defaultValue={vehicleRatePerStay}
                />
              ) : (
                vehicleRatePerStay
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {contentEditable && onCancel && onSave && (
        <div
          className={
            "container-flex-row-space-between-center-full-width margin-top-1"
          }
        >
          <Button
            onClick={onCancel}
            disabled={!itemsChanged}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSave(itemsChanged as ChangedItems)}
            disabled={!itemsChanged}
            variant="contained"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default RatesTable;
