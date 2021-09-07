import { Button, Checkbox, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskStatuses, TaskType } from '../../../api/todolist-api';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditTask from '../EditTask/EditTask';
import Task from '../Task/Task';
import { AppRootStateType } from '../../../store/store';
import { fetchSetTaskTC } from '../../../store/tasks-reducers';
import { FilterValuesType, TodolistDomainType } from '../../../store/todolists-reducers';
import { RequestStatusType } from '../../../store/app-reducer';
import './Todolist.scss';

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
  todolist: TodolistDomainType;
  removeTask: (taskId: string, TodolistId: string) => void;
  changeFilter: (value: FilterValuesType, TodolistId: string) => void;
  addTask: (title: string, TodolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTaskTitle: (taskid: string, title: string, todoListID: string) => void;
  changeTodoListTitle: (title: string, TodolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => void;
  loadingStatus: RequestStatusType;
  demo?: boolean;
};

const Todolist = React.memo(({ demo = false, ...props }: PropsType) => {
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    state => state.tasks[props.todolist.id]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchSetTaskTC(props.todolist.id));
  }, []);
  const classes = useStyles();
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id]
  );

  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [
    props.changeFilter,
    props.todolist.id,
  ]);
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [
    props.changeFilter,
    props.todolist.id,
  ]);
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.todolist.id),
    [props.changeFilter, props.todolist.id]
  );
  const onCklicDeleteTodoList = useCallback(() => props.removeTodolist(props.todolist.id), [
    props.removeTodolist,
    props.todolist.id,
  ]);
  const changeTodoListTitleHandler = useCallback(
    (title: string) => props.changeTodoListTitle(title, props.todolist.id),
    [props.changeTodoListTitle, props.todolist.id]
  );

  let tasksForTodolist = tasks;
  if (props.todolist.filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  console.log(props.todolist.entityStatus);

  return (
    <div>
      <h3>
        <EditTask title={props.todolist.title} changeTaskTitle={changeTodoListTitleHandler} />
        <IconButton
          onClick={onCklicDeleteTodoList}
          color={'secondary'}
          size={'medium'}
          disabled={props.todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <ul className="todolist">
        {tasksForTodolist.map(t => (
          <Task
            key={t.id}
            task={t}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
            todoListID={props.todolist.id}
          />
        ))}
      </ul>
      <div className={classes.root}>
        <Button
          className="button"
          size={'small'}
          variant={'contained'}
          color={props.todolist.filter === 'all' ? 'secondary' : 'primary'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          className="button"
          size={'small'}
          variant={'contained'}
          color={props.todolist.filter === 'active' ? 'secondary' : 'primary'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          className="button"
          size={'small'}
          variant={'contained'}
          color={props.todolist.filter === 'completed' ? 'secondary' : 'primary'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});

export default Todolist;
