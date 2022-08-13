import React from 'react';

import { useTypedSelector } from '../redux/hooks/useTypedSelector';

import TasksList from '../component/TasksList';
import Task from '../component/Task/Task';

const Completed = () => {
  const { tasks } = useTypedSelector((state) => state);

  return (
    <TasksList>
      {!tasks.filter((t) => t.status === 'completed').length && (
        <p className="text-center font-bold text-2xl">You haven't got any completed tasks</p>
      )}
      {tasks?.map((task) => task.status === 'completed' && <Task task={task} key={task.dateBy} />)}
    </TasksList>
  );
};

export default Completed;
