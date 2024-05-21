import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import AuthContext from "../../../contexts/authContext";
import { mobileNavOptions, primaryNavOptions, secondaryNavOptions } from "./navSettings";

import "./style.css";
import { Avatar, BottomNavigation, BottomNavigationAction, Box, Typography } from "@mui/material";
import SearchField from "../../atoms/SearchField";
import { getInitials } from "../../../utils/helpers";
import { APPLICATIONNAME, SECONDARYCOLOR } from "../../../settings";
import SiteSelector from "../../molecules/SiteSelector";
import NavMenu from "./NavMenu";

import SiteContext from "../../../contexts/sitesContext";


import MobileNav from "./MobileNavMenu";

const AppFrame = () => {
  // -----------
  // CONTEXT
  // -----------

  const { user } = useContext(AuthContext);
  const { selectedSite, setSelectedSite } = useContext(SiteContext);

  // -----------
  // STATE
  // -----------

  const [value, setValue] = useState(0);

  // -----------
  // RENDER
  // -----------

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
      <MobileNav primaryNavOptions={mobileNavOptions}/>
    </div>
  );
};

export default AppFrame;
