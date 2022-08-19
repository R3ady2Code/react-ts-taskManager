import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISubtask } from '../../types/types';

const initialState: ISubtask[] = [];

export const subtaskSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    createSubtask(state, action: PayloadAction<ISubtask>) {
      state.push(action.payload);
    },
    deleteSubtask(state, action: PayloadAction<ISubtask>) {
      state.filter((stask) => stask.id !== action.payload.id);
    },
  },
});

export const subtaskActions = subtaskSlice.actions;
export const subtaskReducer = subtaskSlice.reducer;
