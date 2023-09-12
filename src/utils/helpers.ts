export function generateDateArray(startDate: Date, numberOfNights: number) {
    const startDateCpy = new Date(startDate);
    startDateCpy.setHours(12, 0, 0, 0); // Set time to 12:00:00
  
    const dates: Date[] = [];
  
    for (let i = 0; i <= numberOfNights; i++) {
      const newDate = new Date(startDateCpy);
      newDate.setDate(startDateCpy.getDate() + i);
      dates.push(newDate);
    }
  
    return dates;
  }

export const isSameDate = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() && 
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
}