import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { boxActions } from '../slices/box.slice';
import { taskActions } from '../slices/task.slice';
import { subtaskActions } from '../slices/subtask.slice';

const allActions = {
  ...taskActions,
  ...boxActions,
  ...subtaskActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
