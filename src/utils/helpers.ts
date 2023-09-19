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

export function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
}

export function isBookingForDate(
  date: Date,
  bookingStart: Date,
  bookingEnd: Date
) {
  return date >= bookingStart && date <= bookingEnd;
}

export function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

export function getInitials(inputString: string) {
  // Split the input string into words
  const words = inputString.split(" ");

  // Initialize an empty string to store the initials
  let initials = "";

  // Iterate through the words
  for (const word of words) {
    // Get the first character of each word and capitalize it
    const initial = word.charAt(0).toUpperCase();

    // Add the initial to the initials string
    initials += initial;
  }

  return initials;
}
