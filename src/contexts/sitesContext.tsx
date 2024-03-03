import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Site } from "../types";
import AuthContext from "./authContext";

// *****************
// TYPES
// *****************

type SitesContextType = {
  selectedSite: Site | null;
  setSelectedSite: (a: number) => void;
};

// *****************
// CONTEXT
// *****************

const SiteContext = createContext({} as SitesContextType);

// *****************
// PROVIDER
// *****************

export const SitesContextProvider = ({ children }: { children: ReactNode }) => {
  // ----------------
  // CONTEXT
  // ----------------

  const { user } = useContext(AuthContext);

  // ----------------
  // STATE
  // ----------------

  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // ----------------
  // USE EFFECT 
  // ----------------

  useEffect(() => {
    if (user) {
      setSelectedSite(user.sites[0]);
    } 
  }, [user]);

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <SiteContext.Provider
      value={{ selectedSite, setSelectedSite: handleSelectedSiteChange }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
