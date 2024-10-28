export const dateHelper = {
  numberToDateString: (time: number) =>
    new Date(time).toLocaleDateString('ru-RU'),
  dateToNumber: (time: Date) => new Date(time).getTime(),
};
