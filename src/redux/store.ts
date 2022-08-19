import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { taskReducer } from './slices/task.slice';
import { boxReducer } from './slices/box.slice';
import { subtaskReducer } from './slices/subtask.slice';

const rootReducer = combineReducers({
  tasks: taskReducer,
  boxes: boxReducer,
  subtasks: subtaskReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type TypeRootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export default store;
