import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  styled,
  Theme,
  CSSObject,
} from "@mui/material";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { DRAWERWIDTH, PRIMARYCOLOR } from "../../settings";

// -------------
// MIXINS
// -------------

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWERWIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWERWIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type NavDrawerProps = {
  /** Mandatory, whether the drawer is open */
  open: boolean;
  /** Mandatory, function to close the drawer */
  handleDrawerClose: () => void;
  /** Mandatory, the theme */
  theme: any;
  /** Mandatory, the primary navigation options */
  primaryNavOptions: { path: string; text: string; icon: any }[];
  /** Optional, the secondary navigation options */
  secondaryNavOptions?: { path: string; text: string; icon: any }[];
};

const NavDrawer = ({
  open,
  handleDrawerClose,
  theme,
  primaryNavOptions,
  secondaryNavOptions,
}: NavDrawerProps) => {
  const linkStyle = {
    color: PRIMARYCOLOR,
    textDecoration: "none",
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {primaryNavOptions.map((option) => (
          <Link style={linkStyle} to={option.path}>
            <ListItem
              key={option.path}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {secondaryNavOptions && (
        <List>
          {secondaryNavOptions.map((option) => (
            <Link style={linkStyle} to={option.path}>
              <ListItem
                key={option.path}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={option.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Drawer>
  );
};

export default NavDrawer;
