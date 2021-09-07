import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RequestStatusType } from '../../../store/app-reducer';
import { AppRootStateType } from '../../../store/store';
import { Menu } from '@material-ui/icons';

export const Header = () => {
  const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
  return (
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
  );
};
