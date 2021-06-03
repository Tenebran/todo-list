import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type keyType = 'all' | 'active' | 'completed';

export default function App() {
  let [tasks1, setTasks1] = useState([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'HTML&CSS', isDone: true },
    { id: 5, title: 'JS', isDone: true },
    { id: 6, title: 'ReactJS', isDone: false },
  ]);

  let [filter, setFilter] = useState<keyType>('all');
  if (filter === 'active') {
    tasks1 = tasks1.filter(list => !list.isDone);
  }
  if (filter === 'completed') {
    tasks1 = tasks1.filter(list => list.isDone);
  }

  const removeTask = (id: number) => {
    console.log(id);
    tasks1 = tasks1.filter(list => list.id !== id);
    setTasks1(tasks1);
  };

  const changeFilter = (button: keyType) => {
    setFilter(button);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks1}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}
