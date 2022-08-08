import React from 'react';

import { ITask } from '../types/task';

import CreateTaskPanel from '../component/CreateTaskPanel';
import Task from '../component/Task';
import TasksList from '../component/TasksList';
import { useTypedSelector } from '../redux/hooks/useTypedSelector';

const Home = () => {
  const { tasks } = useTypedSelector((state) => state);

  return (
    <>
      <CreateTaskPanel />
      <TasksList>
        {!tasks.length && (
          <p className="text-center font-bold text-2xl">You haven't got any tasks</p>
        )}
        {tasks?.map((task: ITask) => (
          <Task {...task} key={task.dateBy} />
        ))}
      </TasksList>
    </>
  );
};

export default Home;
