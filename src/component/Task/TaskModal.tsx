import React from 'react';

import { ITask, ISubtask } from '../../types/task';
import { useActions } from '../../redux/hooks/useActions';

import Button from '../ui/Button';
import Subtask from '../Subtask';

interface TaskModalProps {
  task: ITask;
  removeTask: () => void;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal, removeTask }) => {
  const spanStyle = 'text-start text-gray-500 font-medium col-start-1	col-end-2';
  const { updateTask, completeTask } = useActions();

  const [newTaskValue, setNewTaskValue] = React.useState<ITask>({ ...task });

  const timeLeft =
    new Date(task.deadline?.date + 'T' + task.deadline?.time).valueOf() -
    new Date(task.dateBy).valueOf();

  //добавление подзадач
  const [newSubtask, setNewSubtask] = React.useState<ISubtask>({
    title: '',
    completed: false,
    dateBy: 0,
  });
  // const [newSubtasks, setNewSubtasks] = React.useState<ISubtask[]>(task.subtasks || []);

  // const addSubtask = (subtask: ISubtask) => {
  //   setNewSubtasks([...newSubtasks, subtask]);
  //   setNewSubtask({ title: '', completed: false, dateBy: 0 });
  // };

  // React.useEffect(() => {
  //   setNewTaskValue({ ...newTaskValue, subtasks: newSubtasks });
  // }, [newSubtasks]);

  //добавление дэдлайна
  // const [newDeadline, setNewDeadline] = React.useState({ date: '', time: '' });
  // React.useEffect(() => {
  //   if (newDeadline.date !== '' && newDeadline.time !== '') {
  //     const deadlineDate = new Date(
  //       newDeadline.date.toString() + 'T' + newDeadline.time.toString(),
  //     );
  //     setNewTaskValue({
  //       ...newTaskValue,
  //       deadline: deadlineDate,
  //     });
  //   }
  // }, [newDeadline]);

  React.useEffect(() => {
    updateTask(newTaskValue);
  }, [newTaskValue]);

  function ucFirst(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <div className="fixed w-full h-full bg-black/10 top-0 left-0" onClick={closeModal}>
      <div
        className="fixed h-screen max-h-screen w-1/2 bg-slate-200 bottom-0 right-0 py-6 px-4 "
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-4xl col-start-1 col-end-5">{task.title}</h2>
          <div className="col-end-12">
            <Button
              title={
                task.status === 'completed' ? 'This task has been completed' : 'To complete task'
              }
              color={task.status === 'completed' ? 'bg-green-600' : 'bg-slate-200'}
              className={`self-end mr-2 border border-green-600 ${
                task.status === 'completed' ? 'text-white' : 'text-green-600'
              }`}
              disabled={task.status === 'completed'}
              size="text-lg"
              onClick={() => completeTask(task)}
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
            className={`col-start-2 col-end-5 ${task.status === 'completed' && 'text-green-600'} ${
              task.status === 'overdue' && 'text-red-600'
            }`}>
            {ucFirst(task.status)}
          </p>

          <span className={spanStyle}>Created date:</span>
          <p className="col-start-2 col-end-5">
            {new Date(task.dateBy).toISOString().split('.')[0].replace('T', ' ')}
          </p>

          <span className={spanStyle}>Description:</span>
          <textarea
            className="col-start-2 col-end-5 h-24 resize-none px-2 py-1 rounded"
            value={newTaskValue.description}
            onChange={(e) => {
              setNewTaskValue({ ...task, description: e.target.value });
            }}
          />

          <span className={spanStyle}>Deadline:</span>
          <input
            type="date"
            className="col-start-2 px-2 py-1 rounded"
            value={newTaskValue.deadline?.date}
            onChange={(e) =>
              setNewTaskValue({
                ...newTaskValue,
                deadline: {
                  ...newTaskValue.deadline,
                  date: e.target.value,
                },
              })
            }
          />
          <input
            type="time"
            className="col-start-3 px-2 py-1 ml-4 rounded"
            value={newTaskValue.deadline?.time}
            onChange={(e) =>
              setNewTaskValue({
                ...newTaskValue,
                deadline: {
                  ...newTaskValue.deadline,
                  time: e.target.value,
                },
              })
            }
          />

          {task.deadline?.date !== '' && task.deadline?.time !== '' && timeLeft > 0 && (
            <>
              <span className={spanStyle}>Days left:</span>
              <p className="col-start-2 col-end-5">
                {timeLeft / 1000 / 60 / 60 / 24 < 1 && '>'}
                {Math.ceil(timeLeft / 1000 / 60 / 60 / 24)}
              </p>
            </>
          )}

          {/* <span className={spanStyle}>Subtasks:</span>
          <input
            type="text"
            className="col-start-2 col-end-5 px-2 py-1 rounded self-start"
            placeholder="Text subtask..."
            value={newSubtask.title}
            onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })}
            onKeyDown={(e) =>
              e.key === 'Enter' && addSubtask({ ...newSubtask, dateBy: Date.now() })
            }
          />
          <p
            className="text-3xl font-black cursor-pointer pl-4 relative"
            onClick={() => addSubtask({ ...newSubtask, dateBy: Date.now() })}>
            <span className="absolute bottom-1">+</span>
          </p>
          <div className="col-start-1 col-end-6">
            {newSubtasks?.map((subtask) => (
              <Subtask {...subtask} key={subtask.dateBy} isEdit />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
