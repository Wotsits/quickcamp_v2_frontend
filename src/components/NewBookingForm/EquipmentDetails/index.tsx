import { Box, Divider, SvgIcon, Typography } from "@mui/material";
import React from "react";
import LargeButton from "../../LargeButton";
import { EquipmentType, ExtraType } from "../../../types";
import { getIcon } from "../../../settings";
import "./style.css";

type EquipmentDetailsProps = {
  equipmentTypes: EquipmentType[];
  formEquipmentType: number;
  setFormEquipmentType: React.Dispatch<React.SetStateAction<number>>;
  extraTypes: ExtraType[];
  formExtras: number[];
  setFormExtras: React.Dispatch<React.SetStateAction<number[]>>;
};

const EquipmentDetails = ({
  equipmentTypes,
  formEquipmentType,
  setFormEquipmentType,
  extraTypes,
  formExtras,
  setFormExtras,
}: EquipmentDetailsProps) => {
  return (
    <Box id="equipment-details" sx={{ mb: 3 }}>
      <Divider variant="middle">Equipment Type</Divider>
      <Box id="equipment-select-container" sx={{ mt: 2, mb: 2 }}>
        {equipmentTypes.map((equipmentType) => {
          return (
            <LargeButton
              key={equipmentType.id}
              onClick={() => setFormEquipmentType(equipmentType.id)}
              highlighted={formEquipmentType === equipmentType.id}
            >
              <SvgIcon
                fontSize="large"
                component={getIcon(equipmentType.icon)}
                className={
                  formEquipmentType === equipmentType.id ? "highlighted" : ""
                }
              />
              <Typography variant="body1">{equipmentType.name}</Typography>
            </LargeButton>
          );
        })}
      </Box>
      <Divider variant="middle">Extras</Divider>
      <Box id="extra-select-container" sx={{ mt: 2 }}>
        {extraTypes.map((extraType) => {
          return (
            <LargeButton
              key={extraType.id}
              onClick={() => {
                if (formExtras.includes(extraType.id)) {
                  setFormExtras(
                    formExtras.filter((extra) => extra !== extraType.id)
                  );
                } else {
                  setFormExtras([...formExtras, extraType.id]);
                }
              }}
              highlighted={formExtras.includes(extraType.id)}
            >
              <SvgIcon
                fontSize="large"
                component={getIcon(extraType.icon)}
                className={
                  formExtras.includes(extraType.id) ? "highlighted" : ""
                }
              />
              <Typography variant="body1">{extraType.name}</Typography>
            </LargeButton>
          );
        })}
      </Box>
    </Box>
  );
};

export default EquipmentDetails;
