import { tasksReducers } from './tasks-reducers';
import { todoListsReducers } from './todolists-reducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  tasks: tasksReducers,
  todolists: todoListsReducers,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
