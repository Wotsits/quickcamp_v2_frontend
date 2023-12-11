import add from "date-fns/add";
import set from "date-fns/set";

export const offsetByClientTimezone = (date: Date) => {
  return new Date(date.setDate(date.getDate() + date.getTimezoneOffset() / 60 / 24));
}

export const setDateToMidday = (date: Date) => {
  try {
    let dateAt1200 = set(date, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    return dateAt1200;
  } catch (err) {
    console.log(err);
    return new Date();
  }
}

export const today1200 = () => {
  try {
    let today = new Date();
    today = setDateToMidday(today);
    return (today);
  } catch (err) {
    console.log(err);
    return new Date();
  }
};

export const addOneMonth = (date: Date) => {
  try {
    const newDate = add(date, { months: 1 });
    let newDateAt1159 = set(newDate, {
      hours: 11,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    });
    return newDateAt1159;
  } catch (err) {
    console.log(err);
    return new Date();
  }
};

export const generateStandardizedDateFormat = (date: Date | string) => {
  const dateObj = new Date(date);
  return `${dateObj.toDateString()} ${dateObj.toLocaleTimeString()}`
}
