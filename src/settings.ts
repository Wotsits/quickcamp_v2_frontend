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

export const EQUIPMENT_TYPES = {
  HIKER: "hiker",
  TENT: "tent",
  CARAVAN: "caravan",
  SMALLVAN: "smallvan",
  LARGEVAN: "largevan",
}

// -------------
// Colors
// -------------

export const PRIMARYCOLOR = "#000428";

export const SECONDARYCOLOR = "#004E92";

export const WEEKENDHIGHLIGHT = "rgba(0,78,146, 0.1)";
