import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import { useFormik } from 'formik';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from './login-reducers';
import { AppRootStateType } from '../../store/store';
import { Redirect } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

  const formik = useFormik({
    validate: values => {
      if (!values.email) {
        return { email: 'Email is required' };
      }

      if (!values.password) {
        return { password: 'Password is required' };
      }
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(loginTC(values));
    },
  });

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
              <div className="login__errors">{formik.errors.email ? formik.errors.email : ''} </div>
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              <div className="login__errors">
                {formik.errors.password ? formik.errors.password : ''}
              </div>
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
