import { Dispatch } from 'redux';
import { authAPI, LoginParamsType } from '../../../api/todolist-api';
import { appSetErrorAC, appSetStatusAC } from '../../store/app-reducer';

const initialState: initialStateType = {
  isLoggedIn: false,
};

export const loginReducers = (
  state: initialStateType = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case 'loggin/SET-LOGGED-IN': {
      return { ...state, isLoggedIn: action.value };
    }

    default: {
      return state;
    }
  }
};

export const setIsLoggedInAC = (value: boolean) => {
  return { type: 'loggin/SET-LOGGED-IN', value } as const;
};

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType>) => {
  dispatch(appSetStatusAC('loading'));
  authAPI.login(data).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
      dispatch(appSetStatusAC('succeeded'));
    } else {
      if (res.data.messages.length) {
        dispatch(appSetErrorAC(res.data.messages[0]));
      } else {
        dispatch(appSetErrorAC('Some Error'));
      }
      dispatch(appSetStatusAC('failed'));
    }
  });
};

export const logOutTC = () => (dispatch: Dispatch<ActionType>) => {
  dispatch(appSetStatusAC('loading'));
  authAPI.logOut().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false));
      dispatch(appSetStatusAC('succeeded'));
    } else {
      if (res.data.messages.length) {
        dispatch(appSetErrorAC(res.data.messages[0]));
      } else {
        dispatch(appSetErrorAC('Some Error'));
      }
      dispatch(appSetStatusAC('failed'));
    }
  });
};

type ActionType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof appSetStatusAC>
  | ReturnType<typeof appSetErrorAC>;
type initialStateType = {
  isLoggedIn: boolean;
};
