import { TasksStateType } from '../App';
import { tasksReducers } from './tasks-reducers';
import { addTodolistAC, TodolistDomainType, todoListsReducers } from './todolists-reducers';

test('new property with array should be added when new todolis is added', () => {
  const startTaskState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC('new todolist');
  const endTasksState = tasksReducers(startTaskState, action);
  const endTodolistState = todoListsReducers(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFormTasks = keys[0];
  const idFormTodolists = endTodolistState[0].id;

  expect(idFormTasks).toBe(action.id);
  expect(idFormTodolists).toBe(action.id);
});
