import { v1 } from 'uuid';
import { FilterValuesType, todoListType } from '../App';

export type RemoveTodolistsAT = {
  type: 'REMOVE-TODOLIST';
  todolistID: string;
};

export type AddTodolistAT = {
  type: 'ADD-TODOLIST';
  title: string;
};

export type ChangeTodolistTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE';
  title: string;
  todolistID: string;
};

export type ChangeTodolistFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER';
  value: FilterValuesType;
  todolistID: string;
};

type ActionType =
  | RemoveTodolistsAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT;

export const todoListsReducers = (
  todolists: Array<todoListType>,
  action: ActionType
): Array<todoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return todolists.filter(todo => todo.id !== action.todolistID);
    }

    case 'ADD-TODOLIST': {
      const newTodoListID = v1();
      const newTodolist: todoListType = { id: newTodoListID, title: action.title, filter: 'all' };
      return [...todolists, newTodolist];
    }

    case 'CHANGE-TODOLIST-TITLE': {
      return todolists.map(list =>
        list.id === action.todolistID ? { ...list, title: action.title } : list
      );
    }

    case 'CHANGE-TODOLIST-FILTER': {
      return todolists.map(list =>
        list.id === action.todolistID ? { ...list, filter: action.value } : list
      );
    }

    default: {
      return todolists;
    }
  }
};

export const removeTodoListAC = (todolistID: string): RemoveTodolistsAT => {
  return { type: 'REMOVE-TODOLIST', todolistID };
};

export const addTodolistAC = (title: string): AddTodolistAT => {
  return { type: 'ADD-TODOLIST', title };
};

export const changeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleAT => {
  return { type: 'CHANGE-TODOLIST-TITLE', todolistID, title };
};

export const changeTodolistFilterAC = (
  todolistID: string,
  value: FilterValuesType
): ChangeTodolistFilterAT => {
  return { type: 'CHANGE-TODOLIST-FILTER', todolistID, value };
};
