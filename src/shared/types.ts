export type Red = number;
export type Green = number;
export type Blue = number;
export type Color = [Red, Green, Blue];
export enum ContrastType {
  BLACK = 'black',
  WHITE = 'white',
}

export type NumberedValue = {
  value: string;
  number: number;
};

export type Customer = {
  id: string;
  name: string;
  age: number;
  isSubscribed: boolean;
};

export type Category = {
  id: string;
  name: string;
  photo?: string;
  commandId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

export type BaseOperation = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  isFavorite?: boolean;
  photo?: string;
  date?: string;
  updatedAt: string;
};

export type Cost = BaseOperation & { type: 'Profit' };
export type Profit = BaseOperation & { type: 'Cost' };

export type Operation = Cost | Profit;
