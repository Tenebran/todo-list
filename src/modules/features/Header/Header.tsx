import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RequestStatusType } from '../../store/app-reducer';
import { AppRootStateType } from '../../store/store';
import { logOutTC } from '../Login/login-reducers';

export const Header = () => {
  const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
  const dispatch = useDispatch();

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC());
  }, []);

  return (
    <AppBar position="fixed">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">News</Typography>
        {isLoggedIn ? (
          <Button variant={'outlined'} color="inherit" onClick={logOutHandler}>
            Log out
          </Button>
        ) : (
          ''
        )}
      </Toolbar>

      {loadingStatus === 'loading' && <LinearProgress color="secondary" />}
    </AppBar>
  );
};
