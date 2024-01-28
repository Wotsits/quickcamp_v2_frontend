import { Divider, List } from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link, useLocation } from "react-router-dom";
import { PRIMARYCOLOR } from "../../../../settings";

const linkStyle = {
  color: PRIMARYCOLOR,
  textDecoration: "none",
};

type NavMenuProps = {
  /** Mandatory, the primary navigation options */
  primaryNavOptions: { path: string; text: string; icon: any }[];
  /** Optional, the secondary navigation options */
  secondaryNavOptions?: { path: string; text: string; icon: any }[];
};

const NavMenu = ({ primaryNavOptions, secondaryNavOptions }: NavMenuProps) => {
  const location = useLocation();

  return (
    <div id="nav-menu">
      <List>
        {primaryNavOptions.map((option) => {
          const active = location.pathname.startsWith("/" + option.path)
          return (
            <Link key={option.path} style={linkStyle} to={option.path}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      color: active ? PRIMARYCOLOR : undefined
                    }}
                  >
                    {option.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      {secondaryNavOptions && (
        <List>
          {secondaryNavOptions.map((option) => {
          const active = location.pathname.startsWith("/" + option.path)
          console.log(location.pathname)
          return (
              <Link key={option.path} style={linkStyle} to={option.path}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                        color: active ? PRIMARYCOLOR : undefined
                      }}
                    >
                      {option.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default NavMenu;
