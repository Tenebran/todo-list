import React from 'react';
import { keyType } from './App';
import Button from './module/components/Button/Button';
import Input from './module/components/Input/Input';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (button: keyType) => void;
  addTask: (newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  const onChangeFilterAll = () => {
    props.changeFilter('all');
  };

  const onChangeFilterActivel = () => {
    props.changeFilter('active');
  };

  const onChangeFilterCompleted = () => {
    props.changeFilter('completed');
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <Input callBack={props.addTask} />
      </div>
      <ul>
        {props.tasks.map(list => {
          const removeTask = () => props.removeTask(list.id);
          return (
            <li key={list.id}>
              <Button callBack={removeTask} value={'X'} />
              <input type="checkbox" defaultChecked={list.isDone} />
              <span>{list.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <Button callBack={onChangeFilterAll} value={'All'} />
        <Button callBack={onChangeFilterActivel} value={'Active'} />
        <Button callBack={onChangeFilterCompleted} value={'Completed'} />
      </div>
    </div>
  );
}
