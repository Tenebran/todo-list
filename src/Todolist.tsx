import { Button, Checkbox, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskStatuses, TaskType } from './api/todolist-api';
import AddItemForm from './modules/components/AddItemForm/AddItemForm';
import EditTask from './modules/components/EditTask/EditTask';
import Task from './modules/components/Task/Task';
import { AppRootStateType } from './store/store';
import { fetchSetTaskTC } from './store/tasks-reducers';
import { FilterValuesType } from './store/todolists-reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0.3),
      },
    },
  })
);

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
  changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => void;
};

const Todolist = React.memo((props: PropsType) => {
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    state => state.tasks[props.todoListID]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSetTaskTC(props.todoListID));
  }, []);
  const classes = useStyles();
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todoListID);
    },
    [props.addTask, props.todoListID]
  );

  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoListID), [
    props.changeFilter,
    props.todoListID,
  ]);
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoListID), [
    props.changeFilter,
    props.todoListID,
  ]);
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.todoListID),
    [props.changeFilter, props.todoListID]
  );
  const onCklicDeleteTodoList = useCallback(() => props.removeTodolist(props.todoListID), [
    props.removeTodolist,
    props.todoListID,
  ]);
  const changeTodoListTitleHandler = useCallback(
    (title: string) => props.changeTodoListTitle(title, props.todoListID),
    [props.changeTodoListTitle, props.todoListID]
  );

  let tasksForTodolist = tasks;
  if (props.filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (props.filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
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
