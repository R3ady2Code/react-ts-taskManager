import { taskReducer } from './slices/task.slice';
import { boxReducer } from './slices/box.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    boxes: boxReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
