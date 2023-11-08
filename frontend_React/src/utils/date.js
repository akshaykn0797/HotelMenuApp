export const DATE_TIME_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export const getLocalDateTime = (reqDate) =>
  new Date(reqDate).toLocaleDateString("en-US", DATE_TIME_OPTIONS);
