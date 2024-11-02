export const dateHelper = {
  numberToDateString: (time: number) =>
    new Date(time).toLocaleDateString('ru-RU'),
  dateToNumber: (time: string | Date) => new Date(time).getTime(),
  dateToIsoString: (time?: string) =>
    (time && new Date(time).toISOString()) || undefined,
  utcToDateString: (utc: string) => new Date(utc).toLocaleDateString('ru-RU'),
  dateStringToDate: (time: string) => new Date(time),
  getDefaultLatestDate: (): Date => {
    const currentDate = new Date();
    return new Date(currentDate.setFullYear(currentDate.getFullYear() + 10));
  },
  getDefaultEarliestDate: (): Date => {
    const currentDate = new Date();
    return new Date(currentDate.setFullYear(currentDate.getFullYear() - 10));
  },
};
