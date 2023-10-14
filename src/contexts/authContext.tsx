import axios, { AxiosError } from "axios";

import React, { ReactNode, createContext, useState } from "react";
import { APIURL } from "../settings";
import { Role, Site, User, UserResponse } from "../types";

// *****************
// TYPES
// *****************

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  error: unknown;
};

type AuthContextType = {
  user: any;
  login: (payload: {
    username: string;
    password: string;
  }) => Promise<LoginResult>;
  selectedSite: Site | null;
  setSelectedSite: (a: number) => void;
};

// *****************
// CONTEXT
// *****************

const AuthContext = createContext({} as AuthContextType);

// *****************
// PROVIDER
// *****************

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // ----------------
  // STATE
  // ----------------

  const [user, setUser] = useState< UserResponse | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // ----------------
  // HELPERS
  // ----------------

  function login(payload: LoginPayload): Promise<LoginResult> {
    return axios
      .post(APIURL + "login", payload)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setSelectedSite(response.data.sites[0]);
          return { success: true, error: "" };
        }
        return { success: false, error: response.data };
      })
      .catch((error: unknown) => {
        return { success: false, error: error };
      });
  }

  // ----------------
  // HANDLERS
  // ----------------

  function handleSelectedSiteChange(siteId: number) {
    const site = user!.sites.find((site: Site) => site.id === siteId);
    if (site) {
      setSelectedSite(site);
    }
  }

  // ----------------
  // RENDER
  // ----------------

  return (
    <AuthContext.Provider
      value={{ user, login, selectedSite, setSelectedSite: handleSelectedSiteChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
