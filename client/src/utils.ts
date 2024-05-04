import { getListingFormData } from "./types";

export const ConvertDateFormat = (date: Date) => {
  const date_obj = new Date(date);
  const formatted_date = date_obj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return formatted_date;
};

export const ProcessDataForFormUpdate = (
  oldValues: getListingFormData,
  newValues: getListingFormData,
  isUpdate: boolean
) => {
  if (!isUpdate) {
    return newValues;
  }
  const differingValues = {};
  for (const key in oldValues) {
    if (
      Object.prototype.hasOwnProperty.call(oldValues, key) &&
      Object.prototype.hasOwnProperty.call(newValues, key)
    ) {
      // @ts-expect-error:type is coming from an api
      if (oldValues[key].toString() !== newValues[key]) {
        // @ts-expect-error:values coming from an api
        differingValues[key] = newValues[key];
      }
    }
  }

  return differingValues;
};
