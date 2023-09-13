export function generateDateArray(startDate: Date, numberOfNights: number) {
  const startDateCpy = new Date(startDate);
  startDateCpy.setHours(23, 59, 0, 0); // Set time to 23:59:00

  const dates: Date[] = [];

  for (let i = 0; i <= numberOfNights; i++) {
    const newDate = new Date(startDateCpy);
    newDate.setDate(startDateCpy.getDate() + i);
    dates.push(newDate);
  }

  return dates;
}

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
};

export const isBookingForDate = (
  date: Date,
  bookingStart: Date,
  bookingEnd: Date
) => {
  return date >= bookingStart && date <= bookingEnd;
};

export const isWeekend = (date: Date) => {
  return date.getDay() === 0 || date.getDay() === 6;
}