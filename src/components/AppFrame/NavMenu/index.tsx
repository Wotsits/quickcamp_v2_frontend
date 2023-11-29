import {
  Divider,
  List,
} from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import { PRIMARYCOLOR } from "../../../settings";

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

const NavMenu = ({
  primaryNavOptions,
  secondaryNavOptions,
}: NavMenuProps) => {

  return (
    <div id="nav-menu">
      <List>
        {primaryNavOptions.map((option) => (
          <Link key={option.path} style={linkStyle} to={option.path}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
            >
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
                  }}
                >
                  {option.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {secondaryNavOptions && (
        <List>
          {secondaryNavOptions.map((option) => (
            <Link key={option.path} style={linkStyle} to={option.path}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
              >
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
                    }}
                  >
                    {option.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </div>
  );
};

export default NavMenu;
