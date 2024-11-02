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
    addOperation: (state, { payload }: PayloadAction<Operation>): void => {
      state.operations = [payload, ...state.operations];
    },
    patchOperation: (state, { payload }: PayloadAction<Operation>): void => {
      state.operations.forEach((old: Operation) => {
        if (old.id === payload?.id) {
          for (const field in payload) {
            // @ts-ignore
            if (payload?.[field]) {
              // @ts-ignore
              old[field] = payload[field];
            }
          }
          // Object.assign(old, payload);
        }
      });
    },
  },
});

export const { addOperations, setTotal, patchOperation, addOperation } =
  operationsSlice.actions;
export const operationsReducer = operationsSlice.reducer;
