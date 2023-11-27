import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import AuthContext from "../../contexts/authContext";
import { primaryNavOptions, secondaryNavOptions } from "./navSettings";

import "./style.css";
import { Avatar, Box, Typography } from "@mui/material";
import SearchField from "../SearchField";
import { getInitials } from "../../utils/helpers";
import { SECONDARYCOLOR } from "../../settings";
import SiteSelector from "../SiteSelector";
import NavMenu from "./NavMenu";

const AppFrame = () => {
  // -----------
  // STATE
  // -----------

  const theme = useTheme();
  const { user, selectedSite, setSelectedSite } = useContext(AuthContext);

  // -----------
  // HANDLERS
  // -----------

  return (
    <div id="app-frame" >
      <div id="app-top-bar" >
        <div id="app-top-bar-left">
          <Typography variant="h5" component="h1">QuickCamp</Typography>
        </div>
        <div id="app-top-bar-right">
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <SearchField callback={(a) => console.log(a)} trigger="ENTER" />
            </Box>
            <Avatar
              sx={{ ml: 2, bgcolor: SECONDARYCOLOR, border: "1px solid white" }}
            >
              {user && getInitials(user.name)}
            </Avatar>
            <SiteSelector
              selectedSite={selectedSite}
              setSelectedSite={setSelectedSite}
              sites={user?.sites || []}
            />
          </Box>
        </div>
      </div>
      <div id="app-body">
        <div id="lh-menu">
          <NavMenu
            primaryNavOptions={primaryNavOptions}
            secondaryNavOptions={secondaryNavOptions}
          />
        </div>
        <main
          id="main-content-container"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppFrame;
