import React, { useState } from "react";
import RatesTable from "../RatesForm";
import { DatePicker } from "@mui/x-date-pickers";
import { setDateToMidday } from "../../utils/dateTimeManipulation";
import "./style.css";
import { add } from "date-fns";

type BulkUpdateRateFormProps = {
  onCancel: () => void;
  onSave: () => void;
};

const BulkUpdateRateForm = ({ onCancel, onSave }: BulkUpdateRateFormProps) => {
  // ----------
  // STATE
  // ----------

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(add(new Date(), { days: 7 }));

  // ----------
  // QUERIES
  // ----------

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
        <RatesTable
          contentEditable={true}
          onCancel={onCancel}
          onSave={onSave}
          baseRate={{
            id: -1,
            perNight: 1,
            perStay: 1,
          }}
          guestRates={[
            [
              "Adult",
              {
                id: -1,
                perNight: 1,
                perStay: 1,
              },
            ],
            [
              "Child",
              {
                id: -1,
                perNight: 1,
                perStay: 1,
              },
            ],
            [
              "Infant",
              {
                id: -1,
                perNight: 1,
                perStay: 1,
              },
            ],
          ]}
          petRate={{
            id: -1,
            perNight: 1,
            perStay: 1,
          }}
          vehicleRate={{
            id: -1,
            perNight: 1,
            perStay: 1,
          }}
        />
      </div>
    </div>
  );
};

export default BulkUpdateRateForm;
