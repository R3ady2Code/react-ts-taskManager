import { configureStore } from '@reduxjs/toolkit';

import { taskReducer } from './slices/task.slice';
import { boxReducer } from './slices/box.slice';
import { subtaskReducer } from './slices/subtask.slice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    boxes: boxReducer,
    subtasks: subtaskReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
