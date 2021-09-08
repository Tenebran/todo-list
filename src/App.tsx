import React, { useEffect } from 'react';
import './App.scss';
import { ErrorSnackbar } from './modules/components/ErrorSnackbar/ErrorSnackbar';
import { Todolists } from './modules/features/Todolists/Todolists';
import { Header } from './modules/features/Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './modules/features/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './modules/store/store';
import { initializedTC, RequestStatusType } from './modules/store/app-reducer';
import CircularProgress from '@material-ui/core/CircularProgress';

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
  const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializedTC());
  }, []);

  if (!isInitialized) {
    return (
      <div className="app__loader">
        <CircularProgress className="app__loader__progress" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ErrorSnackbar />
        <Route
          exact
          path={'/'}
          render={() => <Todolists demo={demo} loadingStatus={loadingStatus} />}
        />
        <Route path={'/login'} render={() => <Login />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
