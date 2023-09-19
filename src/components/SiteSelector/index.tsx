import React, { useState } from "react";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { PRIMARYCOLOR } from "../../settings";
import { getInitials } from "../../utils/helpers";
import { Site } from "../../types";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

type SiteSelectorProps = {
  selectedSite: Site | null;
  sites: Site[];
  setSelectedSite: (a: number) => void;
};

const SiteSelector = ({
  selectedSite,
  sites,
  setSelectedSite,
}: SiteSelectorProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Avatar sx={{ ml: 2, bgcolor: PRIMARYCOLOR, border: "1px solid white" }} onClick={() => setMenuOpen(true)}>
        {selectedSite && getInitials(selectedSite.name)}
      </Avatar>
      {menuOpen && (
        <Modal open={true}>
          <Box sx={style}>
            <Typography variant="h6" component="h1">Select a site</Typography>
            <FormControl sx={{mt: 4}} fullWidth>
              <InputLabel id="site-select-label">Site</InputLabel>
              <Select
                labelId="site-select-label"
                id="demo-simple-select"
                value={selectedSite!.id}
                label="Site"
                onChange={(e) => setSelectedSite(e.target.value as number)}
              >
                {sites.map((site) => (
                  <MenuItem value={site.id}>{site.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default SiteSelector;
