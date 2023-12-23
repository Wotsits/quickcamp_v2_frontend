import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../../components/PageHeader";
import LabelAndValuePair from "../../../../../components/LabelAndValuePair";
import ContentBlock from "../../../../../components/ContentBlock";
import { useQuery } from "react-query";
import { today1200 } from "../../../../../utils/dateTimeManipulation";
import { getSite } from "../../../../../services/queries/getSite";
import {
  GuestFeesCalendar,
  PetFeesCalendar,
  Site,
  UnitType,
  UnitTypeFeesCalendar,
  VehicleFeesCalendar,
} from "../../../../../types";
import AuthContext from "../../../../../contexts/authContext";
import { getUnitTypes } from "../../../../../services/queries/getUnitTypes";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { generateDateArray, isSameDate } from "../../../../../utils/helpers";
import RatesTable from "../../../../../components/RatesTable";

const RatesEditor = () => {
  // ----------
  // CONTEXT
  // ----------

  const { user } = useContext(AuthContext);

  // ----------
  // HOOKS
  // ----------

  const { id } = useParams();

  if (!id) {
    return <div>Invalid site ID</div>;
  }

  const siteId = parseInt(id);

  if (isNaN(siteId)) {
    return <div>Invalid site ID</div>;
  }

  // ----------
  // STATE
  // ----------

  const [startDate, setStartDate] = useState<Date>(today1200());

  const [numberOfNights] = useState(28);
  const [dateArray, setDateArray] = useState(
    generateDateArray(startDate, numberOfNights)
  );

  // ----------
  // QUERIES
  // ----------

  const {
    isLoading: siteIsLoading,
    isError: siteIsError,
    data: siteData,
    error: siteError,
  } = useQuery<{ data: Site }, Error>(["Site", siteId], () =>
    getSite({
      token: user.token,
      id: siteId,
    })
  );

  const {
    isLoading: ratesIsLoading,
    isError: ratesIsError,
    data: ratesData,
    error: ratesError,
  } = useQuery<{ data: UnitType[] }, Error>(
    ["UnitTypes", siteId, startDate, { includeRates: true }],
    () =>
      getUnitTypes({
        token: user.token,
        siteId,
        includeRates: true,
        startDate: startDate.toISOString(),
        endDate: new Date(
          startDate.getTime() + 1000 * 60 * 60 * 24 * 28
        ).toISOString(),
      })
  );

  // ----------
  // HELPERS
  // ----------

  const generateBaseRate = (
    date: Date,
    unitTypeFeesCalendarEntries: UnitTypeFeesCalendar[]
  ) => {
    const unitRateDataForDate = unitTypeFeesCalendarEntries.find((entry) =>
      isSameDate(new Date(entry.date), new Date(date))
    );
    if (!unitRateDataForDate) return null;
    return {
      perNight: unitRateDataForDate.feePerNight,
      perStay: unitRateDataForDate.feePerStay,
    };
  };

  const generateGuestRates = (
    date: Date,
    guestFeesCalendarEntries: GuestFeesCalendar[]
  ) => {
    const guestRateDataForDate = guestFeesCalendarEntries?.filter((entry) =>
      isSameDate(new Date(entry.date), date)
    );
    if (!guestRateDataForDate || guestRateDataForDate.length === 0) return null;
    const dataForReturn = guestRateDataForDate.map((guestRate) => {
      return [
        guestRate.guestType.name,
        {
          perNight: guestRate.feePerNight,
          perStay: guestRate.feePerStay,
        },
      ];
    });
    if (dataForReturn.length === 0) return null;
    return dataForReturn;
  };

  const generatePetRate = (
    date: Date,
    petFeesCalendarEntries: PetFeesCalendar[]
  ) => {
    const petRateDataForDate = petFeesCalendarEntries?.find((entry) =>
      isSameDate(new Date(entry.date), date)
    );
    if (!petRateDataForDate) return null;

    return {
      perNight: petRateDataForDate.feePerNight,
      perStay: petRateDataForDate.feePerStay,
    };
  };

  const generateVehicleRate = (
    date: Date,
    vehicleFeesCalendarEntries: VehicleFeesCalendar[]
  ) => {
    const vehicleRateDataForDate = vehicleFeesCalendarEntries?.find((entry) =>
      isSameDate(new Date(entry.date), date)
    );
    if (!vehicleRateDataForDate) return null;
    return {
      perNight: vehicleRateDataForDate.feePerNight,
      perStay: vehicleRateDataForDate.feePerStay,
    };
  };

  // ----------
  // RENDER
  // ----------

  if (siteIsLoading || ratesIsLoading) return <div>Loading...</div>;
  if (siteIsError || ratesIsError)
    return (
      <>
        <Alert severity="error" className="margin-bottom-1">
          {siteError?.message}
        </Alert>
        <Alert severity="error" className="margin-bottom-1">
          {ratesError?.message}
        </Alert>
      </>
    );

    console.log(ratesData)
  return (
    <div id="rates-editor">
      <PageHeader title="Rates Editor" />
      <ContentBlock title="Site Details">
        <LabelAndValuePair label="Site ID" value={siteId} />
      </ContentBlock>
      <ContentBlock title="Rates">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{minWidth: "200px"}}>Unit Type</TableCell>
                {dateArray.map((date) => (
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ratesData?.data.map((unitType) => (
                <TableRow>
                  <TableCell style={{ verticalAlign: 'top' }}>{unitType.name}</TableCell>
                  {dateArray.map((date) => (
                    <TableCell>
                      <RatesTable
                        baseRate={generateBaseRate(
                          date,
                          unitType.unitTypeFeesCalendarEntries!
                        )}
                        guestRates={generateGuestRates(
                          date,
                          unitType.guestFeesCalendarEntries!
                        )}
                        petRate={generatePetRate(
                          date,
                          unitType.petFeesCalendarEntries!
                        )}
                        vehicleRate={generateVehicleRate(
                          date,
                          unitType.vehicleFeesCalendarEntries!
                        )}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ContentBlock>
    </div>
  );
};

export default RatesEditor;
