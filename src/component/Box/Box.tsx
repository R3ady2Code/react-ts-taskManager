import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ITask, IBox } from '../../types/types';

import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useActions } from '../../redux/hooks/useActions';
import { dndContext } from '../../dndContext';

import Task from '../Task/Task';
import TasksList from '../Lists/TasksList';

const TasksBox: React.FC<IBox> = (box) => {
  const tasks = useTypedSelector((state) => state.tasks.filter((task) => task.boxId === box.id));
  const { deleteBox } = useActions();
  const { dragOverHandler, dropBoxHandler } = React.useContext(dndContext);

  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropBoxHandler(e, box)}
      className="taskBox bg-slate-200 shadow-lg w-[90vw] md:w-[45vw] lg:w-[22vw] min-h-[70vh] rounded-xl mx-3 p-4 flex flex-col items-center relative">
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
      <p
        onClick={() => deleteBox(box)}
        className="taskBox absolute top-3 right-5 font-black text-slate-400 hover:text-slate-600 transition-all text-xl cursor-pointer">
        Х
      </p>
    </div>
  );
};

export default TasksBox;
