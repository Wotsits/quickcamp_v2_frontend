import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import AuthContext from "../../../contexts/authContext";
import { primaryNavOptions, secondaryNavOptions } from "./navSettings";

import "./style.css";
import { Avatar, Box, Typography } from "@mui/material";
import SearchField from "../../atoms/SearchField";
import { getInitials } from "../../../utils/helpers";
import { APPLICATIONNAME, SECONDARYCOLOR } from "../../../settings";
import SiteSelector from "../../molecules/SiteSelector";
import NavMenu from "./NavMenu";

const AppFrame = () => {
  // -----------
  // STATE
  // -----------

  const { user, selectedSite, setSelectedSite } = useContext(AuthContext);

  return (
    <div id="app-frame" >
      <div id="app-top-bar" >
        <div id="app-top-bar-left">
          <Typography variant="h5" component="h1">{APPLICATIONNAME}</Typography>
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
        <div id="app-lh-menu">
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
  );
};

export default AppFrame;
