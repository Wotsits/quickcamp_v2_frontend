import Awning from "./components/atoms/Icons/Awning";
import Caravan from "./components/atoms/Icons/Caravan";
import Electricity from "./components/atoms/Icons/Electricity";
import Hiker from "./components/atoms/Icons/Hiker";
import LargeVan from "./components/atoms/Icons/LargeVan";
import SmallVan from "./components/atoms/Icons/SmallVan";
import Tent from "./components/atoms/Icons/Tent";
import Adult from "./components/atoms/Icons/Adult";
import Child from "./components/atoms/Icons/Child";
import Infant from "./components/atoms/Icons/Infant";
import Youth from "./components/atoms/Icons/Youth";
import Pet from "./components/atoms/Icons/Pet";
import Car from "./components/atoms/Icons/Car";

export const APIURL = process.env.APIURL || "http://localhost:8000";

export const DRAWERWIDTH = 240;

export const APPLICATIONNAME = "YouBook";

export const INFOWEBSITEADDRESS = "https://www.you-book.co.uk";

export const BOOKINGCALENDARCOLUMNWIDTHMIN = 50;

export const DEFAULT_PAGE_SIZE = 5;

export const ROUTES = {
  ROOT: "/",
  DASHBOARD: "dashboard/",
  CALENDAR: "calendar/",
  ARRIVALS: "arrivals/",
  DEPARTURES: "departures/",
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
  RATES: "rates/",
};

export const API_ENDPOINTS = {
  BOOKINGS_BY_SITE: "bookings-by-site/",
  BOOKINGS_BY_SITE_AND_DATE_RANGE: "bookings-by-site-and-date-range/",
  BOOKING_BY_ID: "booking-by-id/",
  BOOKING_NEW: "new-booking/",
  ARRIVALS: "arrivals/",
  DEPARTURES_BY_DATE: "departures-by-date/",
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
  STATS: "stats/",
  TOTAL_ON_SITE: "total-on-site/",
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
  DOG: "Dog",
  WEDDINGGUEST: "WeddingGuest",
  VEHICLE: "Vehicle",
  MOTORBIKE: "Motorbike"
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
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.DOG]: Pet,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.WEDDINGGUEST]: Adult,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.VEHICLE]: Car,
  [OFFICIALLY_SUPPORTED_OCCUPANT_TYPES.MOTORBIKE]: Car // TODO: change this!
};
