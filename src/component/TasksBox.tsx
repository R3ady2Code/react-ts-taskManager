import React from 'react';
import { dndContext } from '../dndContext';

import { ITask, IBox } from '../types/task';

import Task from '../component/Task/Task';
import TasksList from '../component/TasksList';

const TasksBox: React.FC<IBox> = (box) => {
  const { dragOverHandler, dropBoxHandler } = React.useContext(dndContext);

  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropBoxHandler(e, box)}
      className="taskBox bg-slate-200 shadow-lg w-1/5 min-h-[70vh] rounded-xl mx-3 p-4 flex flex-col items-center">
      <h3 className="taskBox font-bold text-2xl">{box.title}</h3>
      <TasksList>
        {!box.tasks?.length && (
          <p className="taskBox text-center text-lg">You haven't got any tasks</p>
        )}
        {box.tasks?.map((task: ITask) => (
          <Task box={box} task={task} key={task.dateBy} />
        ))}
      </TasksList>
    </div>
  );
};

export default TasksBox;
