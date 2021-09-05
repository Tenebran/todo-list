import React, { useCallback, useEffect } from 'react';
import './App.scss';
import Todolist from './modules/components/Todolists/Todolist';
import AddItemForm from './modules/components/AddItemForm/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from './store/todolists-reducers';
import { addTaskTC, deleteTaskTC, updateTaskTC } from './store/tasks-reducers';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './store/store';
import { TaskStatuses, TaskType, todolistAPI } from './api/todolist-api';
import { ErrorSnackbar } from './modules/components/ErrorSnackbar/ErrorSnackbar';
import { RequestStatusType } from './store/app-reducer';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todolist = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
  const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC);
  }, []);

  const removeTask = useCallback(
    (id: string, todoListID: string) => {
      dispatch(deleteTaskTC(todoListID, id));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todoListID: string) => {
      dispatch(addTaskTC(todoListID, title));
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (id: string, status: TaskStatuses, todoListID: string) => {
      dispatch(updateTaskTC(id, { status }, todoListID));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskid: string, title: string, todoListID: string) => {
      dispatch(updateTaskTC(taskid, { title }, todoListID));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todoListID: string) => {
      dispatch(changeTodolistFilterAC(todoListID, value));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todoListID: string) => {
      const action = removeTodolistTC(todoListID);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodolistTC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (title: string, TodolistId: string) => {
      dispatch(changeTodolistTitleTC(TodolistId, title));
    },
    [dispatch]
  );

  const todoListComponents = todolist.map(list => {
    return (
      <Grid item key={list.id}>
        <Paper className="paper-wrapepr" elevation={5}>
          <Todolist
            todoListID={list.id}
            removeTodolist={removeTodolist}
            title={list.title}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={list.filter}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
            loadingStatus={loadingStatus}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button variant={'outlined'} color="inherit">
            Login
          </Button>
        </Toolbar>

        {loadingStatus === 'loading' && <LinearProgress color="secondary" />}
      </AppBar>
      <ErrorSnackbar />
      <Container fixed>
        <Grid container className="add-todolist">
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={5}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
