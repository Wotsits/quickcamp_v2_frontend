import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import { APPLICATIONNAME, PRIMARYCOLOR, SECONDARYCOLOR } from "../../settings";
import AuthContext from "../../contexts/authContext";
import SearchField from "../SearchField";
import SiteSelector from "../SiteSelector";
import { getInitials } from "../../utils/helpers";
import NavDrawer from "./NavDrawer";
import { primaryNavOptions, secondaryNavOptions } from "./navSettings";
import AppBar from "./AppBar";
import QCToolbar from "./QCToolbar";

const AppFrame = () => {
  // -----------
  // STATE
  // -----------

  const theme = useTheme();
  const { user, selectedSite, setSelectedSite } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // -----------
  // HANDLERS
  // -----------

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        style={{
          background: `linear-gradient(to right, ${PRIMARYCOLOR}, ${SECONDARYCOLOR})`,
        }}
      >
        <QCToolbar
          handleDrawerOpen={handleDrawerOpen}
          user={user}
          open={open}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
        />
      </AppBar>
      <NavDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        primaryNavOptions={primaryNavOptions}
        secondaryNavOptions={secondaryNavOptions}
      />
      <Box
        component="main"
        id="main-content-container"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
          pt: 10,
          height: "100vh",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppFrame;
