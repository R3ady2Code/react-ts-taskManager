import React from 'react';

import Button from './ui/Button';

import { ISubtask } from '../types/task';

const Task: React.FC<ISubtask> = (subtask) => {
  return (
    <div className="border py-1 px-2 rounded flex justify-between items-center mb-2 bg-slate-300 transition-all cursor-pointer">
      <h3 className="text-md">{subtask.title}</h3>
      <div className="flex items-center">
        <input type="checkbox" className="mr-2 w-4 h-4" />
        <Button
          title="Delete"
          color="bg-red-500"
          size="text-sm"
          onClick={() => console.log('1989032')}
        />
      </div>
    </div>
  );
};

export default Task;
