import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { router } from "./router";
import { theme } from "./muiTheme";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./contexts/authContext";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// Create a client
const queryClient = new QueryClient();

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthContextProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </AuthContextProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
