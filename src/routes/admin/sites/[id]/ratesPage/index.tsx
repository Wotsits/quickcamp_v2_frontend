import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../../components/PageHeader";
import LabelAndValuePair from "../../../../../components/LabelAndValuePair";
import ContentBlock from "../../../../../components/ContentBlock";
import { useQuery } from "react-query";
import { today1200 } from "../../../../../utils/dateTimeManipulation";
import { getSite } from "../../../../../services/queries/getSite";
import { Site, UnitType } from "../../../../../types";
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
import { generateDateArray } from "../../../../../utils/helpers";
import RatesTable from "../../../../../components/RatesTable";

import Modal, { ModalHeader } from "../../../../../components/Modal";

import {
  generateBaseRate,
  generateGuestRates,
  generatePetRate,
  generateVehicleRate,
} from "./helpers";

export type ChangedItems = {
  id: number;
  newValuePerNight: number | null;
  newValuePerStay: number | null;
}[];

const RatesPage = () => {
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

  const [ratesEditorOpen, setRatesEditorOpen] = useState(false);
  const [baseRateBeingEdited, setBaseRateBeingEdited] = useState<{
    id: number;
    perNight: number;
    perStay: number;
  } | null>(null);
  const [guestRatesBeingEdited, setGuestRatesBeingEdited] = useState<
    | (
        | string
        | {
            id: number;
            perNight: number;
            perStay: number;
          }
      )[][]
    | null
  >(null);
  const [petRateBeingEdited, setPetRateBeingEdited] = useState<{
    id: number;
    perNight: number;
    perStay: number;
  } | null>(null);
  const [vehicleRateBeingEdited, setVehicleRateBeingEdited] = useState<{
    id: number;
    perNight: number;
    perStay: number;
  } | null>(null);

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
  // USEEFFECTS
  // ----------

  useEffect(() => {
    if (
      baseRateBeingEdited &&
      guestRatesBeingEdited &&
      petRateBeingEdited &&
      vehicleRateBeingEdited
    ) {
      setRatesEditorOpen(true);
    } else {
      setRatesEditorOpen(false);
    }
  }, [
    baseRateBeingEdited,
    guestRatesBeingEdited,
    petRateBeingEdited,
    vehicleRateBeingEdited,
  ]);

  // ----------
  // EVENT HANDLERS
  // ----------

  function resetRatesBeingEdited() {
    setBaseRateBeingEdited(null);
    setGuestRatesBeingEdited(null);
    setPetRateBeingEdited(null);
    setVehicleRateBeingEdited(null);
  }

  function handleRatesEdit(changedItems: ChangedItems) {
    console.log(changedItems);
  }

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

  return (
    <div id="rates-display">
      {ratesEditorOpen && (
        <Modal open={true} onClose={() => resetRatesBeingEdited()}>
          <ModalHeader
            title="Edit Rates"
            onClose={() => resetRatesBeingEdited()}
          />
          <RatesTable
            baseRate={baseRateBeingEdited}
            guestRates={guestRatesBeingEdited}
            petRate={petRateBeingEdited}
            vehicleRate={vehicleRateBeingEdited}
            contentEditable
            onCancel={() => resetRatesBeingEdited()}
            onSave={(changedItems: ChangedItems) =>
              handleRatesEdit(changedItems)
            }
          />
        </Modal>
      )}

      <PageHeader title="Rates Editor" />
      <ContentBlock title="Site Details">
        <LabelAndValuePair label="Site ID" value={siteId} />
      </ContentBlock>
      <ContentBlock title="Rates">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: "200px" }}>Unit Type</TableCell>
                {dateArray.map((date) => (
                  <TableCell key={date.toLocaleDateString()}>
                    {date.toLocaleDateString()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ratesData?.data.map((unitType) => (
                <TableRow key={unitType.id}>
                  <TableCell style={{ verticalAlign: "top" }}>
                    {unitType.name}
                  </TableCell>
                  {dateArray.map((date) => {
                    const baseRate = generateBaseRate(
                      date,
                      unitType.unitTypeFeesCalendarEntries!
                    );
                    const guestRates = generateGuestRates(
                      date,
                      unitType.guestFeesCalendarEntries!
                    );
                    const petRate = generatePetRate(
                      date,
                      unitType.petFeesCalendarEntries!
                    );
                    const vehicleRate = generateVehicleRate(
                      date,
                      unitType.vehicleFeesCalendarEntries!
                    );
                    return (
                      <TableCell
                        key={date.toLocaleDateString()}
                        onClick={() => {
                          setBaseRateBeingEdited(baseRate);
                          setGuestRatesBeingEdited(guestRates);
                          setPetRateBeingEdited(petRate);
                          setVehicleRateBeingEdited(vehicleRate);
                        }}
                      >
                        <RatesTable
                          baseRate={baseRate}
                          guestRates={guestRates}
                          petRate={petRate}
                          vehicleRate={vehicleRate}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ContentBlock>
    </div>
  );
};

export default RatesPage;
