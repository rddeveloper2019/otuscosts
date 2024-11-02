import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Operation } from '@/shared/api-types.ts';

type operationsStateType = {
  operations: Operation[];
  total: number;
};

const initialState: operationsStateType = {
  operations: [],
  total: 0,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperations: (
      state,
      { payload }: PayloadAction<{ operations: Operation[] }>
    ): void => {
      state.operations = [...state.operations, ...payload.operations];
    },
    setTotal: (state, { payload }: PayloadAction<number>): void => {
      state.total = payload;
    },
  },
});

export const { addOperations, setTotal } = operationsSlice.actions;
export const operationsReducer = operationsSlice.reducer;
