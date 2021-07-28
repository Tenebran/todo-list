import React from 'react';
import './App.css';
import { Todolist } from './Todolist';
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
import { TaskType } from './Todolist';
import { Menu } from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodoListAC,
} from './store/todolists-reducers';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from './store/tasks-reducers';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './store/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type todoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolist = useSelector<AppRootStateType, todoListType[]>(state => state.todolists);
  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

  const dispatch = useDispatch();

  function removeTask(id: string, todoListID: string) {
    dispatch(removeTaskAC(id, todoListID));
  }

  function addTask(title: string, todoListID: string) {
    dispatch(addTaskAC(title, todoListID));
  }

  function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
    dispatch(changeTaskStatusAC(id, isDone, todoListID));
  }
  function changeTaskTitle(taskid: string, title: string, todoListID: string) {
    dispatch(changeTaskTitleAC(taskid, title, todoListID));
  }

  function changeFilter(value: FilterValuesType, todoListID: string) {
    dispatch(changeTodolistFilterAC(todoListID, value));
  }

  function removeTodolist(todoListID: string) {
    const action = removeTodoListAC(todoListID);
    dispatch(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
  }

  function changeTodoListTitle(title: string, TodolistId: string) {
    dispatch(changeTodolistTitleAC(TodolistId, title));
  }

  const todoListComponents = todolist.map(list => {
    let tasksForTodolist = tasks[list.id];
    if (list.filter === 'active') {
      tasksForTodolist = tasks[list.id].filter(t => t.isDone === false);
    }
    if (list.filter === 'completed') {
      tasksForTodolist = tasks[list.id].filter(t => t.isDone === true);
    }
    return (
      <Grid item key={list.id}>
        <Paper className="paper-wrapepr" elevation={5}>
          <Todolist
            todoListID={list.id}
            removeTodolist={removeTodolist}
            title={list.title}
            tasks={tasksForTodolist}
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
