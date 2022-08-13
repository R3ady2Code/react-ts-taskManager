import React from 'react';
import { dndContext } from '../dndContext';
import { useActions } from '../redux/hooks/useActions';

import { ITask, IBox } from '../types/task';
import { useTypedSelector } from '../redux/hooks/useTypedSelector';

import CreateTaskPanel from '../component/CreateTaskPanel';
import TasksBox from '../component/TasksBox';

const Home = () => {
  const { boxes } = useTypedSelector((state) => state);
  const { removeTaskFromBox, addTaskToBox } = useActions();

  const [currentBox, setCurrentBox] = React.useState<any>(null);
  const [currentTask, setCurrentTask] = React.useState<any>(null);

  function dragOverHandler(e: any) {
    e.preventDefault();
  }

  function dragLeaveHandler(e: any) {
    removeTaskFromBox({ task: currentTask, boxId: currentBox.id });
  }

  function dragStartHandler(e: any, box: IBox, task: ITask) {
    setCurrentBox(box);
    setCurrentTask(task);
  }

  function dropHandler(e: any) {
    e.preventDefault();
  }

  function dropBoxHandler(e: any, box: IBox) {
    addTaskToBox({ task: currentTask, boxId: box.id });
  }

  const overBox = React.useRef<any>(null);

  function dropOverBox(e: any, place: any) {
    if (!e.target.classList.contains('taskBox')) {
      addTaskToBox({ task: currentTask, boxId: currentBox.id });
    }
  }

  return (
    <dndContext.Provider
      value={{
        dragStartHandler,
        dropHandler,
        dragOverHandler,
        dragLeaveHandler,
        dropBoxHandler,
      }}>
      <div
        ref={overBox}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropOverBox(e, overBox)}>
        <CreateTaskPanel />
        <div className="flex justify-center items-start">
          {boxes.map((box) => (
            <TasksBox key={box.id} {...box} />
          ))}
        </div>
      </div>
    </dndContext.Provider>
  );
};

export default Home;
