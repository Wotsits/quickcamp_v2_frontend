import React, { useState } from "react";
import {
  Alert,
} from "@mui/material";
import { ChangedItems, GuestRatesSummary, RateSummary } from "../../../types";
import RatesTable from "../../molecules/RatesTable";
import ButtonContainer from "../../atoms/ButtonContainer";

type RatesFormProps = {
  /** mandatory, baseRate to be displayed in the table */
  baseRate: RateSummary | null;
  /** mandatory, guestRates to be displayed in the table */
  guestRates: GuestRatesSummary | null;
  /** optional, boolean flag controlling whether the content of the table is editable */
  contentEditable?: boolean;
  /** optional, but mandatory if contentEditable flag is true, callback triggered by clicking cancel button */
  onCancel?: () => void;
  /** optional, but mandatory if contentEditable flag is true, callback triggered by clicking save button */
  onSave?: (changedItems: ChangedItems) => void;
  /** optional, boolean flag controlling whether the content of the table is editable */
  validOverride?: boolean;
};

const RatesForm = ({
  baseRate,
  guestRates,
  contentEditable = false,
  onCancel,
  onSave,
  validOverride = true,
}: RatesFormProps) => {
  const [itemsChanged, setItemsChanged] = useState<ChangedItems>([]);

  if (contentEditable && (!onCancel || !onSave)) {
    return (
      <Alert severity="error">
        Oops! A system error has occurred. Please notify support. Error Details:
        Content editable but no onCancel & onSave events specified.
      </Alert>
    );
  }

  // --------
  // EVENT HANDLERS
  // --------

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    type: "BASE" | "GUEST" | "PET" | "VEHICLE",
    perNightOrPerStay: "PER_NIGHT" | "PER_STAY"
  ) {
    const newValue = e.target.value;

    const itemsChangedCpy = [...itemsChanged];
    const itemInArr = itemsChangedCpy.find(
      (item) => item.id === id && item.type === type
    );
    if (!itemInArr) {
      itemsChangedCpy.push({
        id,
        type,
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
    setItemsChanged(itemsChangedCpy);
  }

  // --------
  // RENDER
  // --------

  if (!baseRate) return <div>No base rate</div>;
  if (!guestRates) return <div>No guest rates</div>;

  const baseRateId = baseRate.id;
  const baseRatePerNight = baseRate.perNight;
  const baseRatePerStay = baseRate.perStay;

  return (
    <div className="rates-form">
      <RatesTable 
        contentEditable={contentEditable}
        handleChange={handleChange}
        baseRateId={baseRateId}
        baseRatePerNight={baseRatePerNight}
        baseRatePerStay={baseRatePerStay}
        guestRates={guestRates}
      />
      {contentEditable && onCancel && onSave && (
        <ButtonContainer 
          config={[
            {
              onClick: () => onCancel(),
              disabled: false,
              variant: "outlined",
              color: "secondary",
              text: "Cancel",
            },
            {
              onClick: () => onSave(itemsChanged),
              disabled: !validOverride && itemsChanged.length === 0,
              variant: "contained",
              color: "primary",
              text: "Save",
            },
          ]}
          validOverride={validOverride}
        />
      )}
    </div>
  );
};

export default RatesForm;
