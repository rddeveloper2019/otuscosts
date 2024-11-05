export const dateHelper = {
  numberToDateString: (time: number) =>
    new Date(time).toLocaleDateString('ru-RU'),
  dateToNumber: (time: string | Date) => new Date(time).getTime(),
  dateToISOString: (time?: string | Date) =>
    (time && new Date(time).toISOString()) || undefined,
  utcToDateString: (utc: string | Date) =>
    new Date(utc).toLocaleDateString('ru-RU'),
};
