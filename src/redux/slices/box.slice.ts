import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBox, ITask } from '../../types/task';

const initialState: IBox[] = [
  { id: 1, title: 'In progress', tasks: [] },
  {
    id: 2,
    title: 'Urdent',
    tasks: [
      {
        title: '111',
        dateBy: 1,
        status: 'active',
        deadline: { date: '', time: '' },
      },
      {
        title: '222',
        dateBy: 2,
        status: 'active',
        deadline: { date: '', time: '' },
      },
    ],
  },
  {
    id: 3,
    title: 'For verification',
    tasks: [
      {
        title: '333',
        dateBy: 3,
        status: 'active',
        deadline: { date: '', time: '' },
      },
      {
        title: '444',
        dateBy: 4,
        status: 'active',
        deadline: { date: '', time: '' },
      },
    ],
  },
];

interface ITaskWithBox {
  task: ITask;
  boxId: number;
}

export const boxSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    addTaskToBox(state, action: PayloadAction<ITaskWithBox>) {
      state.map((box) =>
        box.id === action.payload.boxId ? box.tasks?.push(action.payload.task) : box,
      );
    },
    removeTaskFromBox(state, action: PayloadAction<ITaskWithBox>) {
      state.map((box) =>
        box.id === action.payload.boxId
          ? (box.tasks = box.tasks?.filter((task) => task.dateBy !== action.payload.task.dateBy))
          : box,
      );
    },
  },
});

export const boxActions = boxSlice.actions;
export const boxReducer = boxSlice.reducer;
