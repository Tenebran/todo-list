import React from 'react';
import './App.scss';
import { TaskType } from './api/todolist-api';
import { ErrorSnackbar } from './modules/components/ErrorSnackbar/ErrorSnackbar';
import { Todolists } from './modules/components/Todolists/Todolists';
import { Header } from './modules/components/Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './modules/components/Login/Login';

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ErrorSnackbar />
        <Route exact path={'/'} render={() => <Todolists demo={demo} />} />
        <Route path={'/login'} render={() => <Login />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
