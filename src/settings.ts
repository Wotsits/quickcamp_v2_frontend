import { QuestionMark } from "@mui/icons-material";
import Awning from "./components/Icons/Awning";
import Caravan from "./components/Icons/Caravan";
import Electricity from "./components/Icons/Electricity";
import Hiker from "./components/Icons/Hiker";
import LargeVan from "./components/Icons/LargeVan";
import SmallVan from "./components/Icons/SmallVan";
import Tent from "./components/Icons/Tent";
import { ElementType } from "react";

export const APIURL = process.env.APIURL || "http://localhost:8000";

export const DRAWERWIDTH = 240;

export const APPLICATIONNAME = "QuickCamp";

export const INFOWEBSITEADDRESS = "https://www.quickcamp.co.uk";

export const BOOKINGCALENDARCOLUMNWIDTHMIN = 50;

export const ROUTES = {
  ROOT: "/",
  DASHBOARD: "dashboard/",
  CALENDAR: "calendar/",
  ARRIVALS: "arrivals/",
  GUESTS: "guests/",
  BOOKINGS: "bookings/",
  ADMIN: "admin/",
  LOGIN: "login/",
  ID: ":id/",
  NEW: "new/",
  ALL: "all/",
};

export const API_ENDPOINTS = {
  BOOKINGS_BY_SITE: "bookings-by-site",
  BOOKINGS_BY_SITE_AND_DATE_RANGE: "bookings-by-site-and-date-range",
  BOOKING_BY_ID: "booking-by-id",
  BOOKING_NEW: "new-booking",
  ARRIVALS_BY_DATE: "arrivals-by-date",
}

export const SUPPORTED_ICONS = {
  HikerTent: "HikerTent",
  MediumTent: "MediumTent",
  LargeTent: "LargeTent",
  Caravan: "Caravan",
  SmallCampervan: "SmallCampervan",
  LargeCampervan: "LargeCampervan",
  Electric: "Electric",
  Gazebo: "Gazebo",
  Awning: "Awning",
};

export const NEW_OR_EXISTING: {[key: string]: "new" | "existing"} = {
  NEW: "new",
  EXISTING: "existing",
};

// -------------
// Colors
// -------------

export const PRIMARYCOLOR = "#000428";

export const SECONDARYCOLOR = "#004E92";

export const WEEKENDHIGHLIGHT = "rgba(0,78,146, 0.1)";

// -------------
// Setting functions
// -------------

export function getIcon(iconKey: string) {
  switch (iconKey) {
    case SUPPORTED_ICONS.HikerTent:
      return Hiker as unknown as ElementType;
    case SUPPORTED_ICONS.MediumTent:
      return Tent as unknown as ElementType;
    case SUPPORTED_ICONS.LargeTent:
      return Tent as unknown as ElementType;
    case SUPPORTED_ICONS.Caravan:
      return Caravan as unknown as ElementType;
    case SUPPORTED_ICONS.SmallCampervan:
      return SmallVan as unknown as ElementType;
    case SUPPORTED_ICONS.LargeCampervan:
      return LargeVan as unknown as ElementType;
    case SUPPORTED_ICONS.Electric:
      return Electricity as unknown as ElementType;
    case SUPPORTED_ICONS.Gazebo:
      return Awning as unknown as ElementType;
    case SUPPORTED_ICONS.Awning:
      return Awning as unknown as ElementType;
    default:
      return QuestionMark as unknown as ElementType;
  }
}