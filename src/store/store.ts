import { tasksReducers } from './tasks-reducers';
import { todoListsReducers } from './todolists-reducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './app-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducers,
  todolists: todoListsReducers,
  app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
