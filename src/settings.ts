import Awning from "./components/Icons/Awning";
import Caravan from "./components/Icons/Caravan";
import Electricity from "./components/Icons/Electricity";
import Hiker from "./components/Icons/Hiker";
import LargeVan from "./components/Icons/LargeVan";
import SmallVan from "./components/Icons/SmallVan";
import Tent from "./components/Icons/Tent";
import Adult from "./components/Icons/Adult";
import Child from "./components/Icons/Child";
import Infant from "./components/Icons/Infant";
import Youth from "./components/Icons/Youth";
import Pet from "./components/Icons/Pet";
import Car from "./components/Icons/Car";

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
  LOGIN: "login/",
  ID: ":id/",
  NEW: "new/",
  ALL: "all/",
  EXPERIMENTAL: "exp/",
  // ADMIN
  ADMIN: "admin/",
  MENU: "menu/",
  SITES: "sites/",
  UNIT_TYPES: "unit-types/",
  UNITS: "units/",
  GUEST_TYPES: "guest-types/",
  EQUIPMENT_TYPES: "equipment-types/",
  EXTRA_TYPES: "extra-types/",
  USERS: "users/",
};

export const API_ENDPOINTS = {
  BOOKINGS_BY_SITE: "bookings-by-site/",
  BOOKINGS_BY_SITE_AND_DATE_RANGE: "bookings-by-site-and-date-range/",
  BOOKING_BY_ID: "booking-by-id/",
  BOOKING_NEW: "new-booking/",
  ARRIVALS_BY_DATE: "arrivals-by-date/",
  AVAILABLE_UNITS: "available-units/",
  EXTRA_TYPES: "extra-types/",
  GET_FEE_CALC: "get-fee-calc/",
  LEAD_GUESTS: "lead-guests/",
  UNITS: "units/",
  UNIT_TYPES: "unit-types/",
  SITES: "sites/",
  GUEST_TYPES: "guest-types/",
  EQUIPMENT_TYPES: "equipment-types/",
  USERS: "users/",
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

export const OFFICIALLY_SUPPORTED_OCCUPANT_TYPES = {
  ADULT: "Adult",
  CHILD: "Child",
  INFANT: "Infant",
  YOUTH: "Youth",
  PET: "Pet",
  WEDDINGGUEST: "WeddingGuest",
  VEHICLE: "Vehicle",
};

export const NEW_OR_EXISTING: { [key: string]: "new" | "existing" } = {
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
// Icons
// -------------

export const equipmentIcon = {
  [SUPPORTED_ICONS.HikerTent]: Hiker,
  [SUPPORTED_ICONS.MediumTent]: Tent,
  [SUPPORTED_ICONS.LargeTent]: Tent,
  [SUPPORTED_ICONS.Caravan]: Caravan,
  [SUPPORTED_ICONS.SmallCampervan]: SmallVan,
  [SUPPORTED_ICONS.LargeCampervan]: LargeVan,
  [SUPPORTED_ICONS.Electric]: Electricity,
  [SUPPORTED_ICONS.Gazebo]: Awning,
  [SUPPORTED_ICONS.Awning]: Awning,
};

export const occupantTypeIconMap = {
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.ADULT]: Adult,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.CHILD]: Child,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.INFANT]: Infant,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.YOUTH]: Youth,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.PET]: Pet,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.WEDDINGGUEST]: Adult,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.VEHICLE]: Car,
};
