import React from 'react';
import { dndContext } from '../../dndContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { ITask, IBox } from '../../types/types';

import Task from '../Task/Task';
import TasksList from '../TasksList';

const TasksBox: React.FC<IBox> = (box) => {
  const tasks = useTypedSelector((state) => state.tasks.filter((task) => task.boxId === box.id));
  const { dragOverHandler, dropBoxHandler } = React.useContext(dndContext);

  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropBoxHandler(e, box)}
      className="taskBox bg-slate-200 shadow-lg min-w-[20vw] max-w-[22vw] w-1/5 min-h-[70vh] rounded-xl mx-3 p-4 flex flex-col items-center">
      <h3 className="taskBox font-bold text-2xl max-w-full truncate">{box.title}</h3>
      {!tasks?.length && (
        <p className="taskBox text-center text-lg mt-4">You haven't got any tasks</p>
      )}
      <TransitionGroup component={TasksList}>
        {tasks?.map((task: ITask) => (
          <CSSTransition key={task.dateBy} timeout={300} classNames="task">
            <Task box={box} task={task} key={task.dateBy} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TasksBox;
