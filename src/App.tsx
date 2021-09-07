import React from 'react';
import './App.scss';
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { TaskType } from './api/todolist-api';
import { ErrorSnackbar } from './modules/components/ErrorSnackbar/ErrorSnackbar';
import { RequestStatusType } from './store/app-reducer';
import { Todolists } from './modules/components/Todolists/Todolists';
import { Header } from './modules/components/Header/Header';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  return (
    <div className="App">
      <Header />
      <ErrorSnackbar />
      <Todolists demo={demo} />
    </div>
  );
}

export default App;
