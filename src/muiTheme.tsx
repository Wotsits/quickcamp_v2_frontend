import { createTheme } from "@mui/material";
import { PRIMARYCOLOR, SECONDARYCOLOR } from "./settings";

export const theme = createTheme({
    palette: {
      primary: {
        main: PRIMARYCOLOR,
      },
      secondary: {
        main: SECONDARYCOLOR,
      },
    },
  });