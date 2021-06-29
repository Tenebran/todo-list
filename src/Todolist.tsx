import React from 'react';
import { FilterValuesType } from './App';
import AddItemForm from './module/components/AddItemForm/AddItemForm';
import EditTask from './module/components/EditTask/EditTask';

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
  changeTaskTitle: (taskid: string, title: string, todoListID: string) => void;
  changeTodoListTitle: (title: string, TodolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.todoListID);
  };

  const onAllClickHandler = () => props.changeFilter('all', props.todoListID);
  const onActiveClickHandler = () => props.changeFilter('active', props.todoListID);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.todoListID);
  const onCklicDeleteTodoList = () => props.removeTodolist(props.todoListID);
  const changeTodoListTitleHandler = (title: string) =>
    props.changeTodoListTitle(title, props.todoListID);

  return (
    <div>
      <h3>
        <EditTask title={props.title} changeTaskTitle={changeTodoListTitleHandler} />

        <button onClick={onCklicDeleteTodoList}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.todoListID);
          const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID);
          };
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={e => props.changeTask(t.id, props.todoListID)}
              />

              <EditTask title={t.title} name={t.isDone} changeTaskTitle={changeTaskTitle} />
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
