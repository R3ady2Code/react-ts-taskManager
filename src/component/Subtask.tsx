import React from 'react';

import { ISubtask } from '../types/types';

import { useActions } from '../redux/hooks/useActions';

import Button from './ui/Button';

const Subtask: React.FC<ISubtask> = (subtask) => {
  const { deleteSubtask, completeSubtask } = useActions();

  return (
    <div className="border p-3 rounded flex justify-between items-center mb-2 bg-slate-300">
      <h3 className="text-md truncate">{subtask.title}</h3>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 w-4 h-4"
          checked={subtask.completed}
          onChange={() => completeSubtask(subtask)}
        />
        <Button
          title="Delete"
          color="bg-red-500"
          size="text-sm"
          onClick={() => deleteSubtask(subtask)}
        />
      </div>
    </div>
  );
};

export default Subtask;
