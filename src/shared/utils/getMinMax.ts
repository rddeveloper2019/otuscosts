export const getMinMax = <T, K extends keyof T>(
  items: T[],
  key: K
): { min: T[K]; max: T[K] } => {
  if (items.length === 0) {
    throw new Error('Array must not be empty');
  }

  let min: T[K] = items[0][key];
  let max: T[K] = items[0][key];

  for (const item of items) {
    const value = item[key];

    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }

  return { min, max };
};

export const getMinMaxDates = (
  items: { date: string }[]
): { min: Date; max: Date } => {
  if (items.length === 0) {
    throw new Error('Array must not be empty');
  }

  let min: Date = new Date(items[0].date);
  let max: Date = new Date(items[0].date);

  for (const item of items) {
    const value = new Date(item.date);

    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }

  return { min, max };
};
