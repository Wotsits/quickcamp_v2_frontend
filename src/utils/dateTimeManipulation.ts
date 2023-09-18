import add from "date-fns/add";
import set from "date-fns/set";

export const addOneMonth = (date: Date) => {
  try {
    const newDate = add(date, { months: 1 });
    const newDateAt1159 = set(newDate, {
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

export const today1200 = () => {
  try {
    const now = new Date();
    const todayAt1200 = set(now, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    return todayAt1200;
  } catch (err) {
    console.log(err);
    return new Date();
  }
};
