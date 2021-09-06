import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { v1 } from 'uuid';
import { TaskPrioties, TaskStatuses } from './api/todolist-api';
import { appReducer } from './store/app-reducer';
import { AppRootStateType } from './store/store';
import { tasksReducers } from './store/tasks-reducers';
import { todoListsReducers } from './store/todolists-reducers';

const rootReducer = combineReducers({
  tasks: tasksReducers,
  todolists: todoListsReducers,
  app: appReducer,
});

const initialGlobalState = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'loading',
    },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: '',
        completed: false,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        completed: false,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        description: '',
        completed: false,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        description: '',
        completed: false,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
      },
    ],
  },
  app: {
    error: null,
    status: 'idle',
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType,
  applyMiddleware(thunk)
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
