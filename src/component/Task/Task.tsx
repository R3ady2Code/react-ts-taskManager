import React from 'react';

import Button from '../ui/Button';

import { ITask } from '../../types/task';
import TaskModal from './TaskModal';
import { useActions } from '../../redux/hooks/useActions';

const Task: React.FC<ITask> = (task) => {
  const { removeTask, completeTask } = useActions();
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

  return (
    <>
      <div
        className="border py-2 px-4 rounded flex justify-between items-center mb-2 hover:bg-slate-300 transition-all cursor-pointer"
        onClick={openModal}>
        <h3 className={`text-xl ${task.completed && 'text-green-600'}`}>{task.title}</h3>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2 w-4 h-4" onClick={(e) => onChangeComplete(e)} />
          <Button title="Delete" color="bg-red-500" size="text-sm" onClick={onClickDelete} />
        </div>
      </div>
      {visibleModal && <TaskModal closeModal={closeModal} removeTask={onClickDelete} task={task} />}
    </>
  );
};

export default Task;
