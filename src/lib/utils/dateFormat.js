import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

const dateFormat = (date) => {
  return formatInTimeZone(date, "Asia/Jakarta", "dd MMMM yyyy", {
    locale: id,
  });
};

export default dateFormat;
