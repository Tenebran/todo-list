import { Dispatch } from 'redux';
import { todolistAPI, TodolistType } from '../api/todolist-api';
import { appSetStatusAC } from './app-reducer';

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
      const newTodolist: TodolistDomainType = { ...action.todolist, filter: 'all' };
      return [newTodolist, ...todolists];
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

export const addTodolistAC = (todolist: TodolistType) => {
  return { type: 'ADD-TODOLIST', todolist } as const;
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

export const fetchTodolistsTC = (dispatch: Dispatch<ActionType>) => {
  dispatch(appSetStatusAC('loading'));
  todolistAPI.getTodos().then(res => {
    dispatch(setTodolistAC(res.data));
    dispatch(appSetStatusAC('succeeded'));
  });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(appSetStatusAC('loading'));
  todolistAPI.deleteTodo(todolistId).then(res => {
    dispatch(removeTodoListAC(todolistId));
    dispatch(appSetStatusAC('succeeded'));
  });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(appSetStatusAC('loading'));
  todolistAPI.createTodo(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item));
    dispatch(appSetStatusAC('succeeded'));
  });
};

export const changeTodolistTitleTC = (todolistID: string, title: string) => (
  dispatch: Dispatch<ActionType>
) => {
  dispatch(appSetStatusAC('loading'));
  todolistAPI.updateTodo(todolistID, title).then(res => {
    dispatch(changeTodolistTitleAC(todolistID, title));
    dispatch(appSetStatusAC('succeeded'));
  });
};

type ActionType =
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistAC>
  | ReturnType<typeof appSetStatusAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};
