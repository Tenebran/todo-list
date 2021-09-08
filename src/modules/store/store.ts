import { tasksReducers } from '../features/Todolists/tasks-reducers';
import { todoListsReducers } from '../features/Todolists/todolists-reducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './app-reducer';
import { loginReducers } from '../features/Login/login-reducers';

const rootReducer = combineReducers({
  tasks: tasksReducers,
  todolists: todoListsReducers,
  app: appReducer,
  login: loginReducers,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
