import React from 'react';

import { ITask } from '../types/task';

import Button from './ui/Button';

import { useActions } from '../redux/hooks/useActions';

interface TaskModalProps {
  task: ITask;
  removeTask: () => void;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal, removeTask }) => {
  const spanStyle = 'text-start text-gray-500 font-medium col-start-1	col-end-2';

  const { updateTask } = useActions();

  const [editMode, setEditMode] = React.useState(false);
  const [newTaskValue, setNewTaskValue] = React.useState({ ...task });
  const onClickChangeMode = () => {
    if (editMode) {
      updateTask(newTaskValue);
    }
    setEditMode(!editMode);
  };

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
              title={editMode ? 'Save' : 'Edit'}
              color={editMode ? 'bg-green-500' : 'bg-blue-500'}
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
          {!editMode ? (
            <p className={`${task.completed && 'text-green-700'}`}>
              {task.completed ? 'Completed' : 'Active'}
            </p>
          ) : (
            <select
              className="border rounded border-gray-400 py-2 px-3 w-max"
              value={newTaskValue.completed ? 'Completed' : 'Active'}
              onChange={() =>
                setNewTaskValue({ ...newTaskValue, completed: !newTaskValue.completed })
              }>
              <option>Active</option>
              <option>Completed</option>
            </select>
          )}

          <span className={spanStyle}>Created date:</span>
          <p>{new Date(task.dateBy).toLocaleDateString()}</p>

          {task.description && (
            <>
              <span className={spanStyle}>Description:</span>
              <p>{task.description}</p>
              <textarea
                className="col-start-2 col-end-5 h-24 px-2 py-1 rounded"
                value={task.description}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
