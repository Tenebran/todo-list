import { Button, Checkbox, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { FilterValuesType } from './App';
import AddItemForm from './module/components/AddItemForm/AddItemForm';
import EditTask from './module/components/EditTask/EditTask';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0.3),
      },
    },
  })
);

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
  const classes = useStyles();
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
        <IconButton onClick={onCklicDeleteTodoList} color={'secondary'} size={'medium'}>
          <Delete />
        </IconButton>
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
              <Checkbox
                size={'small'}
                color={'primary'}
                checked={t.isDone}
                onChange={e => props.changeTask(t.id, props.todoListID)}
              />

              <EditTask title={t.title} name={t.isDone} changeTaskTitle={changeTaskTitle} />
              <IconButton onClick={onClickHandler} color={'secondary'} size={'small'}>
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div className={classes.root}>
        <Button
          className="button"
          size={'small'}
          variant={'contained'}
          color={props.filter === 'all' ? 'secondary' : 'primary'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          className="button"
          size={'small'}
          variant={'contained'}
          color={props.filter === 'active' ? 'secondary' : 'primary'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          className="button"
          size={'small'}
          variant={'contained'}
          color={props.filter === 'completed' ? 'secondary' : 'primary'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
