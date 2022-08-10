import React from 'react';

import { ITask } from '../../types/task';

import Button from '../ui/Button';
import Subtask from '../Subtask';
import EditTaskModal from './EditTaskModal';

interface TaskModalProps {
  task: ITask;
  removeTask: () => void;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal, removeTask }) => {
  const spanStyle = 'text-start text-gray-500 font-medium col-start-1	col-end-2';

  const [editMode, setEditMode] = React.useState(false);

  const onClickChangeMode = () => {
    setEditMode(!editMode);
  };

  function ucFirst(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  if (editMode)
    return (
      <EditTaskModal
        task={task}
        spanStyle={spanStyle}
        closeModal={closeModal}
        removeTask={removeTask}
        setEditMode={setEditMode}
      />
    );

  return (
    <div className="fixed w-full h-full bg-black/10 top-0 left-0" onClick={closeModal}>
      <div
        className="fixed h-screen max-h-screen w-1/2 bg-slate-200 bottom-0 right-0 py-6 px-4 "
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className="grid grid-cols-5 grid-rows-1 mb-4 items-center">
          <h2 className="font-bold text-4xl col-start-1 col-end-4">{task.title}</h2>
          <div className="col-start-5">
            <Button
              title={'Edit'}
              color={'bg-blue-500'}
              className="self-end mr-2"
              size="text-lg"
              onClick={onClickChangeMode}
            />
            <Button
              title="Delete"
              color="bg-red-500"
              className="self-end"
              size="text-lg"
              onClick={removeTask}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-y-3 text-lg 	">
          <span className={spanStyle}>Status:</span>
          <p
            className={`${task.status === 'completed' && 'text-green-700'} ${
              task.status === 'overdue' && 'text-red-700'
            }`}>
            {ucFirst(task.status)}
          </p>

          <span className={spanStyle}>Created date:</span>
          <p className="col-start-2 col-end-5">
            {new Date(task.dateBy).toISOString().split('.')[0].replace('T', ' ')}
          </p>

          {task.description && (
            <>
              <span className={spanStyle}>Description:</span>
              <p className="col-start-2 col-end-6">{task.description}</p>
            </>
          )}

          {task.deadline && (
            <>
              <span className={spanStyle}>Deadline:</span>
              <p className="col-start-2 col-end-6">
                {task.deadline.date.toISOString().split('.')[0].replace('T', ' ')}
              </p>
            </>
          )}

          <div className="col-start-1 col-end-6">
            {task.subtasks?.map((subtask) => (
              <Subtask {...subtask} key={subtask.dateBy} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
