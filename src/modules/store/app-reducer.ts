import { Dispatch } from 'redux';
import { authAPI } from '../../api/todolist-api';
import { setIsLoggedInAC } from '../features/Login/login-reducers';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false as boolean,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };

    case 'APP/SET-ERROR': {
      return { ...state, error: action.error };
    }
    case 'APP/SET-IS-INITIALIZED': {
      return { ...state, isInitialized: action.isInitialized };
    }
    default:
      return state;
  }
};

export const appSetStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET-STATUS', status } as const;
};

export const appSetErrorAC = (error: string | null) => {
  return { type: 'APP/SET-ERROR', error } as const;
};

export const appSetInitialized = (isInitialized: boolean) => {
  return { type: 'APP/SET-IS-INITIALIZED', isInitialized } as const;
};

export const initializedTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    }
    dispatch(appSetInitialized(true));
  });
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ActionsType =
  | ReturnType<typeof appSetStatusAC>
  | ReturnType<typeof appSetErrorAC>
  | ReturnType<typeof appSetInitialized>
  | ReturnType<typeof setIsLoggedInAC>;

export type InitialStateType = typeof initialState;
