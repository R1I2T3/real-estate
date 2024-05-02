export const ConvertDateFormat = (date: Date) => {
  const date_obj = new Date(date);
  const formatted_date = date_obj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return formatted_date;
};
