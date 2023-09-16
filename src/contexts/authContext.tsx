import axios, { AxiosError } from "axios";

import React, { ReactNode, createContext, useState } from "react";
import { APIURL } from "../settings";

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

  const [user, setUser] = useState(null);

  // ----------------
  // HELPERS
  // ----------------

  function login(payload: LoginPayload): Promise<LoginResult> {
    return axios
      .post(APIURL + "login", payload)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          return { success: true, error: "" };
        }
        return { success: false, error: response.data };
      })
      .catch((error: unknown) => {
        return { success: false, error: error };
      });
  }

  // ----------------
  // RENDER
  // ----------------

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
