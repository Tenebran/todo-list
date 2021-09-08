import {
  todoListsReducers,
  changeTodolistTitleAC,
  removeTodoListAC,
  addTodolistAC,
  changeTodolistFilterAC,
  TodolistDomainType,
  FilterValuesType,
  setTodolistAC,
  setTodolistLoadingStatusAC,
} from './todolists-reducers';
import { v1 } from 'uuid';
import { RequestStatusType } from '../../store/app-reducer';

let startState: Array<TodolistDomainType> = [];
let todoListId1 = v1();
let todolistId2 = v1();

beforeEach(() => {
  startState = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todoListsReducers(startState, removeTodoListAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
  expect(endState[0].title).toBe('What to buy');
});

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist';

  const endState = todoListsReducers(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist';

  const endState = todoListsReducers(
    startState,
    changeTodolistTitleAC(todolistId2, newTodolistTitle)
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed';

  const endState = todoListsReducers(startState, changeTodolistFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
  const endState = todoListsReducers([], setTodolistAC(startState));

  expect(endState.length).toBe(2);
});

test('correct entityStatus of todolist should be changed', () => {
  let entityStatus: RequestStatusType = 'loading';

  const endState = todoListsReducers(
    startState,
    setTodolistLoadingStatusAC(entityStatus, todolistId2)
  );

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe('loading');
});
