import { Grid, Paper, Container } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskStatuses, TaskType } from '../../../api/todolist-api';
import { RequestStatusType } from '../../store/app-reducer';
import { AppRootStateType } from '../../store/store';
import { addTaskTC, deleteTaskTC, updateTaskTC } from './tasks-reducers';
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from './todolists-reducers';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import Todolist from './Todolist/Todolist';
import { Redirect } from 'react-router-dom';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

type PropsType = {
  demo?: boolean;
  loadingStatus: RequestStatusType;
};

export const Todolists = (props: PropsType) => {
  const todolist = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.demo || !isLoggedIn) {
      return;
    }
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

  if (!isLoggedIn) {
    return <Redirect to={'/login'} />;
  }

  return (
    <Container fixed>
      <Grid container className="add-todolist">
        <AddItemForm addItem={addTodoList} classTitle={'add-item-form'} />
      </Grid>

      <Grid container spacing={5}>
        {todolist.map(list => {
          return (
            <Grid item key={list.id}>
              <Paper className="paper-wrapepr" elevation={5}>
                <Todolist
                  todolist={list}
                  removeTodolist={removeTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  changeTodoListTitle={changeTodoListTitle}
                  loadingStatus={props.loadingStatus}
                  demo={props.demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
