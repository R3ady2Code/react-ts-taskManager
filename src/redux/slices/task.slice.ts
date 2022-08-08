import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITask } from '../../types/task';

const initialState: ITask[] = [];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<ITask>) {
      state.push(action.payload);
    },
    removeTask(state, action: PayloadAction<{ dateBy: number }>) {
      return state.filter((task) => task.dateBy !== action.payload.dateBy);
    },
    completeTask(state, action: PayloadAction<ITask>) {
      return state.map((item) =>
        item.dateBy === action.payload.dateBy
          ? { ...item, completed: !item.completed }
          : { ...item },
      );
    },
    updateTask(state, action: PayloadAction<ITask>) {
      return state.map((item) =>
        item.dateBy === action.payload.dateBy ? { ...action.payload } : { ...item },
      );
    },
  },
});

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
