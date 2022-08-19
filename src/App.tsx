import React from 'react';
import { dndContext } from './dndContext';
import { useActions } from './redux/hooks/useActions';

import { ITask, IBox } from './types/types';
import { useTypedSelector } from './redux/hooks/useTypedSelector';

import CreateTaskPanel from './component/CreateTaskPanel';
import TasksBox from './component/Box/Box';
import { CreateBoxBtn } from './component/ui/CreateBoxBtn';
import CreationBox from './component/Box/CreationBox';
import BoxesList from './component/Lists/BoxesList';
import Header from './component/Header';

const App = () => {
  const { boxes } = useTypedSelector((state) => state);
  const { updateTask } = useActions();

  const [currentBox, setCurrentBox] = React.useState<any>(null);
  const [currentTask, setCurrentTask] = React.useState<any>(null);

  function dragOverHandler(e: any) {
    e.preventDefault();
    updateTask({ ...currentTask, boxId: null });
  }

  function dragStartHandler(e: any, box: IBox, task: ITask) {
    setCurrentBox(box);
    setCurrentTask(task);
  }

  function dropHandler(e: any) {
    e.preventDefault();
  }

  function dropBoxHandler(e: any, box: IBox) {
    updateTask({ ...currentTask, boxId: box.id });
  }

  const overBox = React.useRef<any>(null);

  function dropOverBox(e: any, place: any) {
    if (!e.target.classList.contains('taskBox')) {
      // addTaskToBox({ task: currentTask, boxId: currentBox.id });
    }
  }

  const [addBoxMode, setAddBoxMode] = React.useState(false);

  const onClickToPlusBtn = () => {
    setAddBoxMode(true);
  };

  return (
    <dndContext.Provider
      value={{
        dragStartHandler,
        dropHandler,
        dragOverHandler,
        dropBoxHandler,
      }}>
      <Header />
      <div
        ref={overBox}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropOverBox(e, overBox)}>
        <CreateTaskPanel />
        <BoxesList>
          {boxes.map((box) => (
            <TasksBox key={box.id} {...box} />
          ))}
          {addBoxMode ? (
            <CreationBox closeThis={() => setAddBoxMode(false)} />
          ) : (
            <CreateBoxBtn onClick={onClickToPlusBtn} />
          )}
        </BoxesList>
      </div>
    </dndContext.Provider>
  );
};

export default App;
