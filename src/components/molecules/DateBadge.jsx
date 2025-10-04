import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";
import Badge from "@/components/atoms/Badge";

const DateBadge = ({ date }) => {
  if (!date) return null;

  const dateObj = parseISO(date);
  const isOverdue = isPast(dateObj) && !isToday(dateObj);

  let variant = "default";
  let label = format(dateObj, "MMM dd");

  if (isToday(dateObj)) {
    variant = "warning";
    label = "Today";
  } else if (isTomorrow(dateObj)) {
    variant = "success";
    label = "Tomorrow";
  } else if (isOverdue) {
    variant = "error";
    label = format(dateObj, "MMM dd");
  }

  return <Badge variant={variant}>{label}</Badge>;
};

export default DateBadge;