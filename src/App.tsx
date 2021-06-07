import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';

export type keyType = 'all' | 'active' | 'completed';

export default function App() {
  let [tasks1, setTasks1] = useState([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ]);

  let [filter, setFilter] = useState<keyType>('all');
  if (filter === 'active') {
    tasks1 = tasks1.filter(list => !list.isDone);
  }
  if (filter === 'completed') {
    tasks1 = tasks1.filter(list => list.isDone);
  }

  const removeTask = (id: string) => {
    tasks1 = tasks1.filter(list => list.id !== id);
    setTasks1(tasks1);
  };

  const changeFilter = (button: keyType) => {
    setFilter(button);
  };

  const addTask = (title: string) => {
    let newTask = { id: v1(), title, isDone: true };
    setTasks1([newTask, ...tasks1]);
  };
  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks1}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}
