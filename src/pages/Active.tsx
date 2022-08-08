import React from 'react';

import { useTypedSelector } from '../redux/hooks/useTypedSelector';

import TasksList from '../component/TasksList';
import Task from '../component/Task';

const Active = () => {
  const { tasks } = useTypedSelector((state) => state);

  return (
    <TasksList>
      {!tasks.length && (
        <p className="text-center font-bold text-2xl">You haven't got any active tasks</p>
      )}
      {tasks?.map((task) => !task.completed && <Task {...task} key={task.dateBy} />)}
    </TasksList>
  );
};

export default Active;
