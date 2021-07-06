import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './module/components/AddItemForm/AddItemForm';
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

export type FilterValuesType = 'all' | 'active' | 'completed';

type todoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  const [todolist, setTodolist] = useState<Array<todoListType>>([
    { id: todoListID1, title: 'What To Learn', filter: 'all' },
    { id: todoListID2, title: 'Movie', filter: 'all' },
  ]);

  let [tasks, setTasks] = useState({
    [todoListID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoListID2]: [
      { id: v1(), title: 'Terminator', isDone: true },
      { id: v1(), title: 'Marvel', isDone: true },
      { id: v1(), title: 'Iron Man', isDone: false },
      { id: v1(), title: 'Spider Man', isDone: false },
    ],
  });

  function removeTask(id: string, todoListID: string) {
    tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
    setTasks({ ...tasks });
  }

  function addTask(title: string, todoListID: string) {
    let task = { id: v1(), title: title, isDone: false };
    tasks[todoListID] = [task, ...tasks[todoListID]];
    setTasks({ ...tasks });
  }

  // let [filter, setFilter] = useState<FilterValuesType>('all');

  function changeTask(id: string, todoListID: string) {
    let task = tasks[todoListID];
    let newTask = task.find(list => list.id === id);
    if (newTask) {
      newTask.isDone = !newTask.isDone;
      setTasks({ ...tasks });
    }
  }
  function changeTaskTitle(taskid: string, title: string, todoListID: string) {
    tasks[todoListID] = tasks[todoListID].map(t => {
      if (t.id === taskid) {
        return { ...t, title: title };
      }
      return t;
    });
    setTasks({ ...tasks });
  }

  function changeFilter(value: FilterValuesType, todoListID: string) {
    let newTodolist = todolist.find(list => list.id === todoListID);
    if (newTodolist) {
      newTodolist.filter = value;
    }
    setTodolist([...todolist]);
  }

  function removeTodolist(todoListID: string) {
    setTodolist(todolist.filter(todo => todo.id !== todoListID));
    delete tasks[todoListID];
  }

  function addTodoList(title: string) {
    const newTodoListID = v1();
    const newTodolist: todoListType = { id: newTodoListID, title: title, filter: 'all' };

    setTodolist([...todolist, newTodolist]);
    setTasks({ ...tasks, [newTodoListID]: [] });
  }

  function changeTodoListTitle(title: string, TodolistId: string) {
    const upDatedTodoList = todolist.map(tl => {
      if (tl.id === TodolistId) {
        return { ...tl, title: title };
      }
      return tl;
    });

    setTodolist(upDatedTodoList);
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
            changeTask={changeTask}
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
