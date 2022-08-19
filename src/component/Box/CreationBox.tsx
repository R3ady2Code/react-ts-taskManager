import React from 'react';

import { useActions } from '../../redux/hooks/useActions';

interface Props {
  closeThis: Function;
}

const CreationBox: React.FC<Props> = ({ closeThis }) => {
  //отследить клик вне компонента
  const rootEl = React.useRef<any>();
  const handleClickOutside = (e: any) => {
    if (!rootEl.current?.contains(e.target)) {
      closeThis();
    }
  };
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  //логика создания нового бокса
  const [boxTitle, setBoxTitle] = React.useState('');
  const { createBox } = useActions();

  const createNewBox = (title: string) => {
    const newBox = {
      title,
      id: Date.now(),
      tasks: [],
    };
    createBox(newBox);
    closeThis();
  };

  return (
    <div
      ref={rootEl}
      className={`taskBox min-w-[20vw] bg-slate-200 shadow-lg w-1/5 min-h-[70vh] rounded-xl mx-3 p-4 flex flex-col items-center`}>
      <div className="flex items-center justify-between">
        <input
          className="taskBox font-bold text-xl w-[90%] p-2 rounded"
          placeholder="Text new box name..."
          value={boxTitle}
          onInput={(e: any) => setBoxTitle(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && createNewBox(boxTitle)}
          autoFocus
        />
        <p
          className="text-3xl font-semibold text-slate-700 cursor-pointer"
          onClick={() => createNewBox(boxTitle)}>
          +
        </p>
      </div>
    </div>
  );
};

export default CreationBox;
