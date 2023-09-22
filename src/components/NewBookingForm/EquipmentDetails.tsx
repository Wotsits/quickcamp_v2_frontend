import { Box, Divider, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import LargeButton from '../LargeButton';
import { EQUIPMENT_TYPES } from '../../settings';
import Hiker from '../Icons/Hiker';
import Tent from '../Icons/Tent';
import Caravan from '../Icons/Caravan';
import SmallVan from '../Icons/SmallVan';
import LargeVan from '../Icons/LargeVan';
import Electricity from '../Icons/Electricity';
import NoElectricity from '../Icons/NoElectricity';

type EquipmentDetailsProps = {
    formEquipmentType: string;
    setFormEquipmentType: React.Dispatch<React.SetStateAction<string>>;
    formEquipmentEhu: boolean;
    setFormEquipmentEhu: React.Dispatch<React.SetStateAction<boolean>>;
}

const EquipmentDetails = ({formEquipmentType, setFormEquipmentType, formEquipmentEhu, setFormEquipmentEhu}: EquipmentDetailsProps) => {
    return (
        <Box id="equipment-details" sx={{mb: 3}}>
        <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
          Equipment Details
        </Typography>
        <Box id="equipment-select-container" sx={{mb: 2}}>
            <LargeButton onClick={() => setFormEquipmentType(EQUIPMENT_TYPES.HIKER)} highlighted={formEquipmentType === EQUIPMENT_TYPES.HIKER}>
                <SvgIcon fontSize="large" component={Hiker} className={formEquipmentType === EQUIPMENT_TYPES.HIKER ? "highlighted" : ""} />
                <Typography variant="body1">Hiker</Typography>
            </LargeButton>
            <LargeButton onClick={() => setFormEquipmentType(EQUIPMENT_TYPES.TENT)} highlighted={formEquipmentType === EQUIPMENT_TYPES.TENT}>
                <SvgIcon fontSize="large" component={Tent}  className={formEquipmentType === EQUIPMENT_TYPES.TENT ? "highlighted" : ""} />
                <Typography variant="body1">Tent</Typography>
            </LargeButton>
            <LargeButton onClick={() => setFormEquipmentType(EQUIPMENT_TYPES.CARAVAN)} highlighted={formEquipmentType === EQUIPMENT_TYPES.CARAVAN}>
                <SvgIcon fontSize="large" component={Caravan} className={formEquipmentType === EQUIPMENT_TYPES.CARAVAN ? "highlighted" : ""} />
                <Typography variant="body1">Caravan</Typography>
            </LargeButton>
            <LargeButton onClick={() => setFormEquipmentType(EQUIPMENT_TYPES.SMALLVAN)} highlighted={formEquipmentType === EQUIPMENT_TYPES.SMALLVAN}>
                <SvgIcon fontSize="large" component={SmallVan} className={formEquipmentType === EQUIPMENT_TYPES.SMALLVAN ? "highlighted" : ""} />
                <Typography variant="body1">Small Van</Typography>
            </LargeButton>
            <LargeButton onClick={() => setFormEquipmentType(EQUIPMENT_TYPES.LARGEVAN)} highlighted={formEquipmentType === EQUIPMENT_TYPES.LARGEVAN}>
                <SvgIcon fontSize="large" component={LargeVan} classes={formEquipmentType === EQUIPMENT_TYPES.LARGEVAN ? "highlighted" : ""} />
                <Typography variant="body1">Large Van</Typography>
            </LargeButton>
        </Box>
        <Divider variant="middle" />
        <Box id="ehu-select-container" sx={{mt:2}}>
            <LargeButton onClick={() => setFormEquipmentEhu(true)} highlighted={formEquipmentEhu === true}>
                <SvgIcon fontSize="large" component={Electricity} className={formEquipmentEhu === true ? "highlighted" : ""} />
                <Typography variant="body1">EHU</Typography>
            </LargeButton>
            <LargeButton onClick={() => setFormEquipmentEhu(false)} highlighted={formEquipmentEhu === false}>
                <SvgIcon fontSize="large" component={NoElectricity} className={formEquipmentEhu === false ? "highlighted" : ""} />
                <Typography variant="body1">Non-EHU</Typography>
            </LargeButton>
        </Box>
      </Box>
    );
}

export default EquipmentDetails;