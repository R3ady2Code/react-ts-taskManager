import { taskReducer } from './slices/task.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
