import React from 'react';

interface TasksListProps {
  children: React.ReactNode;
}

const TasksList: React.FC<TasksListProps> = ({ children }) => {
  return <div className="taskBox container mx-auto max-w-2xl mt-5">{children}</div>;
};

export default TasksList;
