import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../../components/molecules/PageHeader";
import LabelAndValuePair from "../../../../../components/molecules/LabelAndValuePair";
import ContentBlock from "../../../../../components/atoms/ContentBlock";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { today1200 } from "../../../../../utils/dateTimeManipulation";
import { getSite } from "../../../../../services/queries/getSite";
import {
  BulkRateUpdateObj,
  ChangedItems,
  GuestRatesSummary,
  RateSummary,
  Site,
  UnitType,
} from "../../../../../types";
import AuthContext from "../../../../../contexts/authContext";
import { getUnitTypes } from "../../../../../services/queries/getUnitTypes";
import {
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { generateDateArray } from "../../../../../utils/helpers";
import RatesForm from "../../../../../components/organisms/RatesForm";

import Modal, { ModalHeader } from "../../../../../components/molecules/Modal";

import {
  generateBaseRate,
  generateGuestRates,
  generatePetRate,
  generateVehicleRate,
} from "./helpers";

import { updateRates } from "../../../../../services/mutations/updateRates";

import UpgradeIcon from "@mui/icons-material/Upgrade";
import BulkUpdateRateForm from "../../../../../components/organisms/BulkUpdateRateForm";
import { updateRatesByDates } from "../../../../../services/mutations/updateRatesByDates";

const RatesPage = () => {
  // ----------
  // CONTEXT
  // ----------

  const { user } = useContext(AuthContext);

  // ----------
  // HOOKS
  // ----------

  const queryClient = useQueryClient();

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

  const [bulkUpdateModalOpen, setBulkUpdateModalOpen] = useState(false);

  const [ratesEditorOpen, setRatesEditorOpen] = useState(false);
  const [baseRateBeingEdited, setBaseRateBeingEdited] = useState<RateSummary | null>(null);
  const [guestRatesBeingEdited, setGuestRatesBeingEdited] = useState<GuestRatesSummary | null>(null);
  const [petRateBeingEdited, setPetRateBeingEdited] = useState<RateSummary | null>(null);
  const [vehicleRateBeingEdited, setVehicleRateBeingEdited] = useState<RateSummary | null>(null);

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
  // MUTATIONS
  // ----------

  const {
    mutate: updateRatesByIdMutate,
    isError: updateRatesByIdIsError,
    error: updateRatesByIdError,
  } = useMutation({
    mutationFn: updateRates,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["UnitTypes"]);
      resetRatesBeingEdited();
    },
  });

  const {
    mutate: updateRatesByDatesMutate,
    isError: updateRatesByDatesIsError,
    error: updateRatesByDatesError,
  } = useMutation({
    mutationFn: updateRatesByDates,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["UnitTypes"]);
    },
  });

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
    updateRatesByIdMutate({
      token: user.token,
      changedItems,
    });
  }

  function handleBulkRatesEdit(
    changedItems: BulkRateUpdateObj,
    startDate: Date,
    endDate: Date
  ) {
    console.log(changedItems, startDate, endDate)
    // updateRatesByDatesMutate({
    //   token: user.token,
    //   changedItems,
    //   startDate,
    //   endDate,
    // });
  }

  // ----------
  // RENDER
  // ----------

  if (siteIsLoading || ratesIsLoading) return <div>Loading...</div>;
  if (siteIsError || ratesIsError || updateRatesByIdIsError)
    return (
      <>
        <Alert severity="error" className="margin-bottom-1">
          {siteError?.message}
        </Alert>
        <Alert severity="error" className="margin-bottom-1">
          {ratesError?.message}
        </Alert>
        <Alert severity="error" className="margin-bottom-1">
          {(updateRatesByIdError as Error)?.message}
        </Alert>
      </>
    );

  if (!ratesData?.data || !siteData?.data) return <div>No data</div>;

  return (
    <div id="rates-display">
      {/** SINGLE RATE UPDATE MODAL */}

      {ratesEditorOpen && (
        <Modal open={true} onClose={() => resetRatesBeingEdited()}>
          <ModalHeader
            title="Edit Rates"
            onClose={() => resetRatesBeingEdited()}
          />
          <RatesForm
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

      {/** BULK RATE UPDATE MODAL */}

      {bulkUpdateModalOpen && (
        <Modal open={true} onClose={() => setBulkUpdateModalOpen(false)}>
          <ModalHeader
            title="Bulk Update"
            onClose={() => setBulkUpdateModalOpen(false)}
          />
          <BulkUpdateRateForm
            unitTypes={ratesData.data}
            onCancel={() => setBulkUpdateModalOpen(false)}
            onSave={(
              changedItems: BulkRateUpdateObj,
              startDate: Date,
              endDate: Date
            ) => handleBulkRatesEdit(changedItems, startDate, endDate)}
          />
        </Modal>
      )}

      <PageHeader title="Rates Editor">
        <Button
          variant="contained"
          startIcon={<UpgradeIcon />}
          onClick={() => setBulkUpdateModalOpen(true)}
        >
          Bulk Update
        </Button>
      </PageHeader>

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
                    if (!baseRate || !guestRates || !petRate || !vehicleRate)
                      return null;
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
                        <RatesForm
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
