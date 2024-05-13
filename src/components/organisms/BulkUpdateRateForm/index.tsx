import React, { useContext, useEffect, useState } from "react";
import RatesTable from "../../molecules/RatesTable";
import { DatePicker } from "@mui/x-date-pickers";
import { setDateToMidday } from "../../../utils/dateTimeManipulation";
import "./style.css";
import { add } from "date-fns";
import {
  BulkRateUpdateObj,
  GuestRatesSummary,
  SimpleRate,
  UnitType,
} from "../../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ButtonContainer from "../../atoms/ButtonContainer";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import AuthContext from "../../../contexts/authContext";
import { getGuestTypes } from "../../../services/queries/getGuestTypes";
import { GuestType } from "../../../types";
import { generateFormState } from "./helpers";

type BulkUpdateRateFormProps = {
  unitTypes: UnitType[];
  onCancel: () => void;
  onSave: (
    changedItems: BulkRateUpdateObj,
    startDate: Date,
    endDate: Date
  ) => void;
};

const BulkUpdateRateForm = ({
  unitTypes,
  onCancel,
  onSave,
}: BulkUpdateRateFormProps) => {
  // ----------
  // CONTEXT
  // ----------

  const { user } = useContext(AuthContext);

  // ----------
  // HOOKS
  // ----------

  const queryClient = useQueryClient();

  const { id: siteId } = useParams();

  if (!siteId) {
    return <div>Invalid site ID</div>;
  }

  // check that the id is the correct type

  const parsedSiteId = Number(siteId);

  if (isNaN(parsedSiteId)) {
    return <div>Invalid site ID</div>;
  }

  // ----------
  // STATE
  // ----------

  const [formState, setFormState] = useState<BulkRateUpdateObj | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(add(new Date(), { days: 7 }));

  // DECIDING WHETHER THE USER NEEDS A WARNING AS THERE ARE RATES WHICH ARE SET TO ZERO.
  const [warning, setWarning] = useState(true)

  // ----------
  // QUERIES
  // ----------

  const {
    isLoading,
    isError,
    data: guestTypes,
    error,
  } = useQuery<{ data: GuestType[] }, Error>(["guestTypes", siteId], () =>
    getGuestTypes({ token: user.token, siteId: parsedSiteId })
  );

  // ----------
  // EFFECTS
  // ----------

  useEffect(() => {
    // when guestTypes are recieved, build the formState obj
    if (guestTypes) {
      const newFormState = generateFormState(unitTypes, guestTypes.data);
      setFormState(newFormState);
    }
  }, [guestTypes]);

  useEffect(() => {
    // each time the formState changes, check whether there are any items that have no 
  }, [formState])

  // ----------
  // EVENT HANDLERS
  // ----------

  function onChange() {
    console.log("onChange");
  }

  // ----------
  // RENDER
  // ----------

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Alert severity="error">{(error as Error).message}</Alert>;
  }

  if (formState === null) return <div>Loading...</div>;

  return (
    <div className={"bulk-update-rate-form"}>
      {/* START / END DATE CONTAINER */}

      <div className={"date-range-container"}>
        <DatePicker
          onChange={(value: Date | null) =>
            setStartDate(setDateToMidday(value as Date))
          }
          value={startDate}
          label={"Start date"}
        />
        <DatePicker
          onChange={(value: Date | null) =>
            setEndDate(setDateToMidday(value as Date))
          }
          value={endDate}
          label={"End date"}
        />
      </div>

      {/* ACCORDIONS FOR EACH UNIT TYPE */}

      <div className="update-form">
        {formState.map((unitType) => (
          <Accordion
            key={unitType.unitTypeId}
            className="unit0type-acccordion"
            TransitionProps={{ unmountOnExit: false }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`accordion-${unitType.unitTypeId}-content`}
              id={`accordion-${unitType.unitTypeId}-header`}
            >
              {unitType.unitTypeName}
            </AccordionSummary>
            <AccordionDetails>
              <RatesTable
                contentEditable={true}
                handleChange={onCancel}
                baseRateId={unitType.rates.base.id}
                baseRatePerNight={unitType.rates.base.perNight}
                baseRatePerStay={unitType.rates.base.perStay}
                guestRates={unitType.rates.guest}
              />
            </AccordionDetails>
          </Accordion>
        ))}

        {/* SAVE / RESET BUTTON CONTAINER */}

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
              onClick: () => onSave(formState, startDate, endDate),
              disabled: false,
              variant: "contained",
              color: "primary",
              text: "Save",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BulkUpdateRateForm;
