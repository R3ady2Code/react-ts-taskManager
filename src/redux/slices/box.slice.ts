import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBox } from '../../types/types';

const initialState: IBox[] = [
  { title: 'In progress', id: 1 },
  { title: 'Urgent', id: 2 },
  { title: 'To verify', id: 3 },
];

export const boxSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    createBox(state, action: PayloadAction<IBox>) {
      state.push(action.payload);
    },
    deleteBox(state, action: PayloadAction<IBox>) {
      return state.filter((box) => box.id !== action.payload.id);
    },
  },
});

export const boxActions = boxSlice.actions;
export const boxReducer = boxSlice.reducer;
