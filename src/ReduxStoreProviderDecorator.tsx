import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { v1 } from 'uuid';
import { TaskPrioties, TaskStatuses } from './api/todolist-api';
import { AppRootStateType } from './store/store';
import { tasksReducers } from './store/tasks-reducers';
import { todoListsReducers } from './store/todolists-reducers';

const rootReducer = combineReducers({
  tasks: tasksReducers,
  todolists: todoListsReducers,
});

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
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

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
