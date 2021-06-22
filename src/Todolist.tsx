import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, TodolistId: string) => void;
  changeFilter: (value: FilterValuesType, TodolistId: string) => void;
  addTask: (title: string, TodolistId: string) => void;
  changeTask: (id: string, TodolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (id: string) => void;
  todoListID: string;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState('');
  let [error, setError] = useState<null | string>(null);

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(title.trim(), props.todoListID);
    } else {
      setError('Title is requared');
    }
    setTitle('');
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError(null);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask();
    }
  };

  const onAllClickHandler = () => props.changeFilter('all', props.todoListID);
  const onActiveClickHandler = () => props.changeFilter('active', props.todoListID);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.todoListID);
  const onCklicDeleteTodoList = () => props.removeTodolist(props.todoListID);

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={onCklicDeleteTodoList}>X</button>
      </h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.todoListID);

          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={e => props.changeTask(t.id, props.todoListID)}
              />
              <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
