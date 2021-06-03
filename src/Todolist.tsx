import React from 'react';
import { keyType } from './App';

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (button: keyType) => void;
};

export function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(list => (
          <li key={list.id}>
            <button onClick={() => props.removeTask(list.id)}>X</button>
            <input type="checkbox" defaultChecked={list.isDone} />
            <span>{list.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
}
