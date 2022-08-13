import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { boxActions } from '../slices/box.slice';
import { taskActions } from '../slices/task.slice';

const allActions = {
  ...taskActions,
  ...boxActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
