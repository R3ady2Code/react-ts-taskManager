import React from 'react';
import { dndContext } from '../../dndContext';
import { Transition } from 'react-transition-group';

import Button from '../ui/Button';

import { ITask, IBox } from '../../types/types';
import TaskModal from './TaskModal';
import { useActions } from '../../redux/hooks/useActions';

interface Props {
  task: ITask;
  box?: IBox;
}

const Task: React.FC<Props> = ({ task, box }) => {
  const { removeTask, completeTask, updateTask } = useActions();

  const dndCtx = React.useContext(dndContext);

  const [visibleModal, setVisibleModal] = React.useState(false);

  const onClickDelete = () => {
    removeTask({ dateBy: task.dateBy });
  };

  const onChangeComplete = (e: any) => {
    e.stopPropagation();
    completeTask(task);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const openModal = () => {
    setVisibleModal(true);
  };

  React.useEffect(() => {
    if (task.deadline) {
      if (task.deadline.valueOf() < task.dateBy) {
        const newStatusTask = {
          ...task,
          status: 'overdue',
        };
        updateTask(newStatusTask);
      }
    }
  }, [task, updateTask]);

  return (
    <>
      <div
        draggable={true}
        onDragOver={(e) => dndCtx.dragOverHandler(e)}
        onDragStart={(e) => dndCtx.dragStartHandler(e, box, task)}
        onDrop={(e) => dndCtx.dropHandler(e)}
        className="task taskBox py-2 px-4 rounded flex justify-between items-center mb-2 bg-slate-300 hover:bg-slate-400 transition-all cursor-grab"
        onClick={openModal}>
        <h3
          className={`text-xl ${task.status === 'completed' && 'text-green-600'} ${
            task.status === 'overdue' && 'text-red-600'
          } truncate`}>
          {task.title}
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 w-4 h-4"
            checked={task.status === 'completed'}
            onClick={(e) => onChangeComplete(e)}
          />
          <Button title="Delete" color="bg-red-500" size="text-sm" onClick={onClickDelete} />
        </div>
      </div>
      <Transition in={visibleModal} timeout={300} unmountOnExit mountOnEnter>
        {(state) => (
          <TaskModal
            transitionState={state}
            closeModal={closeModal}
            removeTask={onClickDelete}
            task={task}
          />
        )}
      </Transition>
    </>
  );
};

export default Task;
