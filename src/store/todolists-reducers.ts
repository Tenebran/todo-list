import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { todolistAPI, TodolistType } from '../api/todolist-api';

type ActionType =
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistAC>;

export const todoListID1 = v1();
export const todoListID2 = v1();

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

const initialState: Array<TodolistDomainType> = [];

export const todoListsReducers = (
  todolists: Array<TodolistDomainType> = initialState,
  action: ActionType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'SET-TODOLIST': {
      return action.todolist.map(list => {
        return { ...list, filter: 'all' };
      });
    }

    case 'REMOVE-TODOLIST': {
      return todolists.filter(todo => todo.id !== action.todolistID);
    }

    case 'ADD-TODOLIST': {
      const newTodolist: TodolistDomainType = {
        id: action.id,
        title: action.title,
        filter: 'all',
        addedDate: '',
        order: 0,
      };
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

export const removeTodoListAC = (todolistID: string) => {
  return { type: 'REMOVE-TODOLIST', todolistID } as const;
};

export const addTodolistAC = (title: string) => {
  return { type: 'ADD-TODOLIST', title, id: v1() } as const;
};

export const changeTodolistTitleAC = (todolistID: string, title: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', todolistID, title } as const;
};

export const changeTodolistFilterAC = (todolistID: string, value: FilterValuesType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', todolistID, value } as const;
};

export const setTodolistAC = (todolist: Array<TodolistType>) => {
  return { type: 'SET-TODOLIST', todolist } as const;
};

export const fetchTodolistsTC = (dispatch: Dispatch) => {
  todolistAPI.getTodos().then(res => {
    dispatch(setTodolistAC(res.data));
  });
};
