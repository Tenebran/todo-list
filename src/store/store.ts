import { tasksReducers } from './tasks-reducers';
import { todoListsReducers } from './todolists-reducers';
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  tasks: tasksReducers,
  todolists: todoListsReducers,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
