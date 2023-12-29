import React, { useContext, useState } from "react";
import RatesTable from "../RatesTable";
import { DatePicker } from "@mui/x-date-pickers";
import { setDateToMidday } from "../../utils/dateTimeManipulation";
import "./style.css";
import { add } from "date-fns";
import { UnitType } from "../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ButtonContainer from "../ButtonContainer";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { getGuestTypes } from "../../services/queries/getGuestTypes";
import { GuestType } from "../../types";

type BulkUpdateRateFormProps = {
  unitTypes: UnitType[];
  onCancel: () => void;
  onSave: () => void;
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(add(new Date(), { days: 7 }));

  // ----------
  // QUERIES
  // ----------

  const { isLoading, isError, data, error } = useQuery<
    { data: GuestType[] },
    Error
  >(["guestTypes", siteId], () =>
    getGuestTypes({ token: user.token, siteId: parsedSiteId })
  );

  // ----------
  // EVENT HANDLERS
  // ----------

  function onChange() {
    console.log("onChange");
  }

  // ----------
  // HELPERS
  // ----------

  function generateEmptyGuestRates(guestTypes: GuestType[]) {
    return guestTypes.map((guestType) => [
      guestType.name,
      {
        id: -1,
        perNight: 0,
        perStay: 0,
      },
    ]);
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

  return (
    <div className={"bulk-update-rate-form"}>
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
      <div className="update-form">
        {unitTypes.map((unitType) => (
          <Accordion
            key={unitType.id}
            className="unit-type-accordion"
            TransitionProps={{ unmountOnExit: false }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id={`accordion-${unitType.id}-header`}
            >
              {unitType.name}
            </AccordionSummary>
            <AccordionDetails>
              <RatesTable
                contentEditable={true}
                handleChange={onCancel}
                baseRateId={-1}
                baseRatePerNight={0}
                baseRatePerStay={0}
                guestRates={generateEmptyGuestRates(data!.data)}
                petRateId={-1}
                petRatePerNight={0}
                petRatePerStay={0}
                vehicleRateId={-1}
                vehicleRatePerNight={0}
                vehicleRatePerStay={0}
              />
            </AccordionDetails>
          </Accordion>
        ))}
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
              onClick: () => onSave(),
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
