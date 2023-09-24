import { Box, Divider, SvgIcon, Typography } from "@mui/material";
import React, { ElementType } from "react";
import LargeButton from "../LargeButton";
import Hiker from "../Icons/Hiker";
import Tent from "../Icons/Tent";
import Caravan from "../Icons/Caravan";
import SmallVan from "../Icons/SmallVan";
import LargeVan from "../Icons/LargeVan";
import Electricity from "../Icons/Electricity";
import NoElectricity from "../Icons/NoElectricity";
import { EquipmentType } from "../../types";

function getIcon(iconKey: string) {
  switch (iconKey) {
    case "HikerTent":
      return Hiker as unknown as ElementType;
    case "MediumTent":
      return Tent as unknown as ElementType;
    case "LargeTent":
      return Tent as unknown as ElementType;
    case "Caravan":
      return Caravan as unknown as ElementType;
    case "SmallCampervan":
      return SmallVan as unknown as ElementType;
    case "LargeCampervan":
      return LargeVan as unknown as ElementType;
    default:
      return <div></div> as unknown as ElementType;
  }
}

type EquipmentDetailsProps = {
  equipmentTypes: EquipmentType[];
  formEquipmentType: number;
  setFormEquipmentType: React.Dispatch<React.SetStateAction<number>>;
  formEquipmentEhu: boolean;
  setFormEquipmentEhu: React.Dispatch<React.SetStateAction<boolean>>;
};

const EquipmentDetails = ({
  equipmentTypes,
  formEquipmentType,
  setFormEquipmentType,
  formEquipmentEhu,
  setFormEquipmentEhu,
}: EquipmentDetailsProps) => {
  return (
    <Box id="equipment-details" sx={{ mb: 3 }}>
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Equipment Details
      </Typography>
      <Box id="equipment-select-container" sx={{ mb: 2 }}>
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
      <Divider variant="middle" />
      <Box id="ehu-select-container" sx={{ mt: 2 }}>
        <LargeButton
          onClick={() => setFormEquipmentEhu(true)}
          highlighted={formEquipmentEhu === true}
        >
          <SvgIcon
            fontSize="large"
            component={Electricity}
            className={formEquipmentEhu === true ? "highlighted" : ""}
          />
          <Typography variant="body1">EHU</Typography>
        </LargeButton>
        <LargeButton
          onClick={() => setFormEquipmentEhu(false)}
          highlighted={formEquipmentEhu === false}
        >
          <SvgIcon
            fontSize="large"
            component={NoElectricity}
            className={formEquipmentEhu === false ? "highlighted" : ""}
          />
          <Typography variant="body1">Non-EHU</Typography>
        </LargeButton>
      </Box>
    </Box>
  );
};

export default EquipmentDetails;
