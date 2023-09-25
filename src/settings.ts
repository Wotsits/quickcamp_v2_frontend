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

export const APPLICATIONNAME = "Ark Booking Management";

export const INFOWEBSITEADDRESS = "https://www.arkbookingmanagement.co.uk";

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