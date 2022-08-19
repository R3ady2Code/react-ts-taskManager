import React from 'react';
import moment from 'moment';
import useTimeout from '../../hooks/useTimeout';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ITask, ISubtask } from '../../types/types';

import { useActions } from '../../redux/hooks/useActions';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';

import Button from '../ui/Button';
import Subtask from '../Subtask';

interface TaskModalProps {
  task: ITask;
  removeTask: (e: Event) => void;
  closeModal: () => void;
  transitionState?: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal, removeTask, transitionState }) => {
  const spanStyle = 'text-start text-gray-500 font-medium col-start-1	col-end-2';
  const { updateTask, completeTask, createSubtask } = useActions();

  const [newTaskValue, setNewTaskValue] = React.useState<ITask>({ ...task });

  const deadlineDate = new Date(task.deadline?.date + 'T' + task.deadline?.time);

  const timeLeft = deadlineDate.valueOf() - new Date(task.dateBy).valueOf();

  useTimeout(
    () => {
      if (task.deadline && task.status === 'active') {
        alert(`Task "${task.title}" was expired!`);
        setNewTaskValue({ ...newTaskValue, status: 'overdue' });
      }
    },
    task.status === 'completed' ? null : timeLeft,
  );

  React.useEffect(() => {
    updateTask(newTaskValue);
  }, [newTaskValue]);

  //добавление подзадач
  const subtasks = useTypedSelector((state) =>
    state.subtasks.filter((st) => st.taskId === task.dateBy),
  );

  const [newSubtask, setNewSubtask] = React.useState<any>({
    title: '',
    completed: false,
    taskId: task.dateBy,
    id: Date.now(),
  });

  const addSubtask = () => {
    if (!newSubtask.title) return alert('Please select a subtask title');
    createSubtask(newSubtask);
    setNewSubtask({ title: '', completed: false, id: Date.now(), taskId: task.dateBy });
  };

  function ucFirst(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <div className="fixed w-full h-full bg-black/10 top-0 left-0 z-10 " onClick={closeModal}>
      <div
        className={`taskModal ${transitionState} absolute h-screen overflow-y-auto w-full lg:w-1/2 bg-slate-200 bottom-0 right-0 py-6 px-4`}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-4xl col-start-1 col-end-5 truncate">{task.title}</h2>
          <div className="flex flex-col md:flex-row items-center lg:col-end-12">
            <Button
              title={
                task.status === 'completed' ? 'This task has been completed' : 'To complete task'
              }
              color={task.status === 'completed' ? 'bg-green-600' : 'bg-slate-200'}
              className={`self-end md:mr-2 border border-green-600 ${
                task.status === 'completed' ? 'text-white' : 'text-green-600'
              }`}
              disabled={task.status === 'completed'}
              size="sm:text-xs md:text-lg mb-2 md:mb-[0px]"
              onClick={() => completeTask(task)}
            />
            <Button
              title="Delete"
              color="bg-red-500"
              className="self-end"
              size="sm:text-xs md:text-lg"
              onClick={removeTask}
            />
          </div>
        </div>

        <div className="flex flex-col lg:grid grid-cols-5 gap-y-3 text-lg ">
          <span className={spanStyle}>Status:</span>
          <p
            className={`col-start-2 col-end-5 ${task.status === 'completed' && 'text-green-600'} ${
              task.status === 'overdue' && 'text-red-600'
            }`}>
            {ucFirst(task.status)}
          </p>

          <span className={spanStyle}>Created date:</span>
          <p className="col-start-2 col-end-5">
            {moment(task.dateBy).format('ddd DD-MMM-YYYY, HH:mm')}
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
            className="col-start-3 px-2 py-1 lg:ml-4 rounded"
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

          <span className={spanStyle}>Subtasks:</span>
          <div className="flex lg:col-start-2 lg:col-end-5">
            <input
              type="text"
              className="px-2 py-1 rounded self-start"
              placeholder="Text subtask..."
              value={newSubtask.title}
              onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
            />
            <p className="text-3xl font-black cursor-pointer pl-4 lg:relative" onClick={addSubtask}>
              <span className="lg:absolute bottom-1">+</span>
            </p>
          </div>

          <div className="col-start-1 col-end-6">
            <TransitionGroup>
              {subtasks?.map((subtask) => (
                <CSSTransition key={subtask.id} timeout={300} classNames="task">
                  <Subtask {...subtask} key={subtask.id} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
