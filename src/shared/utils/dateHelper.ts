export const dateHelper = {
  numberToDateString: (time: number) =>
    new Date(time).toLocaleDateString('ru-RU'),
  dateToNumber: (time: Date) => new Date(time).getTime(),
  dateToIsoString: (time: string) => new Date(time).toISOString(),
  utcToDateString: (utc: string) => new Date(utc).toLocaleDateString('ru-RU'),
};
