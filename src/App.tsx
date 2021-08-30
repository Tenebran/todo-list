import React, { useCallback, useEffect } from 'react';
import './App.css';
import Todolist from './Todolist';
import AddItemForm from './modules/components/AddItemForm/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodoListAC,
  setTodolistAC,
  TodolistDomainType,
} from './store/todolists-reducers';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from './store/tasks-reducers';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './store/store';
import { TaskStatuses, TaskType, todolistAPI } from './api/todolist-api';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolist = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC);
  }, []);

  const removeTask = useCallback(
    (id: string, todoListID: string) => {
      dispatch(removeTaskAC(id, todoListID));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todoListID: string) => {
      dispatch(addTaskAC(title, todoListID));
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (id: string, status: TaskStatuses, todoListID: string) => {
      dispatch(changeTaskStatusAC(id, status, todoListID));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskid: string, title: string, todoListID: string) => {
      dispatch(changeTaskTitleAC(taskid, title, todoListID));
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
      const action = removeTodoListAC(todoListID);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (title: string, TodolistId: string) => {
      dispatch(changeTodolistTitleAC(TodolistId, title));
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
      </AppBar>
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
