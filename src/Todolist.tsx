import { Button, Checkbox, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FilterValuesType } from './App';
import AddItemForm from './modules/components/AddItemForm/AddItemForm';
import EditTask from './modules/components/EditTask/EditTask';
import Task from './modules/components/Task/Task';
import { AppRootStateType } from './store/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0.3),
      },
    },
  })
);

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  removeTask: (taskId: string, TodolistId: string) => void;
  changeFilter: (value: FilterValuesType, TodolistId: string) => void;
  addTask: (title: string, TodolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (id: string) => void;
  todoListID: string;
  changeTaskTitle: (taskid: string, title: string, todoListID: string) => void;
  changeTodoListTitle: (title: string, TodolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void;
};

const Todolist = React.memo((props: PropsType) => {
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    state => state.tasks[props.todoListID]
  );
  const classes = useStyles();
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todoListID);
    },
    [props.addTask, props.todoListID]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.todoListID),
    [props.changeFilter, props.todoListID]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.todoListID),
    [props.changeFilter, props.todoListID]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.todoListID),
    [props.changeFilter, props.todoListID]
  );
  const onCklicDeleteTodoList = useCallback(
    () => props.removeTodolist(props.todoListID),
    [props.removeTodolist, props.todoListID]
  );
  const changeTodoListTitleHandler = useCallback(
    (title: string) => props.changeTodoListTitle(title, props.todoListID),
    [props.changeTodoListTitle, props.todoListID]
  );

  let tasksForTodolist = tasks;
  if (props.filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }
  if (props.filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

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
        {tasksForTodolist.map(t => (
          <Task
            key={t.id}
            task={t}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
            todoListID={props.todoListID}
          />
        ))}
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
});

export default Todolist;
