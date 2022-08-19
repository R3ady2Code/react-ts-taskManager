import React from 'react';
import { useActions } from '../redux/hooks/useActions';
import { useTypedSelector } from '../redux/hooks/useTypedSelector';

import Button from './ui/Button';

const CreateTaskPanel: React.FC = () => {
  const { boxes } = useTypedSelector((state) => state);
  const { createTask } = useActions();
  const [newTaskTitle, setNewTaskTitle] = React.useState('');

  const clickCreateTask = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    if (!newTaskTitle.trim()) {
      alert('New task title is not available');
      return setNewTaskTitle('');
    }
    if (!boxes.length) {
      return alert('First create a box');
    }

    const newTask = {
      title: newTaskTitle.trim(),
      dateBy: Date.now(),
      status: 'active',
      boxId: boxes[0].id,
    };

    createTask(newTask);
    setNewTaskTitle('');
  };

  return (
    <div className="container mx-auto w-3/5 mt-5 mb-5 flex items-center">
      <input
        className="border rounded py-3 px-5 text-2xl mr-3 w-5/6"
        type="text"
        placeholder="Type your task..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && clickCreateTask()}
      />
      <Button title="Add task" color="bg-blue-500" size="text-lg" onClick={clickCreateTask} />
    </div>
  );
};

export default CreateTaskPanel;
