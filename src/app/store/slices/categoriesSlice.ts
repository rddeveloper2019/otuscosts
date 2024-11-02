import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/shared/api-types.ts';

type categoriesStateType = {
  categories: Category[];
};

const initialState: categoriesStateType = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (
      state,
      { payload }: PayloadAction<{ category: Category }>
    ): void => {
      state.categories.unshift(payload.category);
    },
    addCategories: (
      state,
      { payload }: PayloadAction<{ categories: Category[] }>
    ): void => {
      state.categories = [...state.categories, ...payload.categories];
    },
  },
});

export const { addCategory, addCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
