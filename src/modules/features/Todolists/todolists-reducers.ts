import axios from 'axios';
import { Dispatch } from 'redux';
import { todolistAPI, TodolistType } from '../../../api/todolist-api';
import { appSetErrorAC, appSetStatusAC, RequestStatusType } from '../../store/app-reducer';
import { AxiosError } from 'axios';

const initialState: Array<TodolistDomainType> = [];

export const todoListsReducers = (
  todolists: Array<TodolistDomainType> = initialState,
  action: ActionType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'SET-TODOLIST': {
      return action.todolist.map(list => {
        return { ...list, filter: 'all', entityStatus: 'idle' };
      });
    }

    case 'REMOVE-TODOLIST': {
      return todolists.filter(todo => todo.id !== action.todolistID);
    }

    case 'ADD-TODOLIST': {
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: 'all',
        entityStatus: 'idle',
      };
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

    case 'SET-TODOLIST-STATUS': {
      return todolists.map(list =>
        list.id === action.todolistID ? { ...list, entityStatus: action.entityStatus } : list
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
  todolistAPI
    .getTodos()
    .then(res => {
      dispatch(setTodolistAC(res.data));
      dispatch(appSetStatusAC('succeeded'));
    })
    .catch((error: AxiosError) => {
      dispatch(appSetErrorAC(error.message));
    });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(appSetStatusAC('loading'));
  dispatch(setTodolistLoadingStatusAC('loading', todolistId));
  todolistAPI.deleteTodo(todolistId).then(res => {
    dispatch(removeTodoListAC(todolistId));
    dispatch(appSetStatusAC('succeeded'));
    dispatch(setTodolistLoadingStatusAC('succeeded', todolistId));
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
  dispatch(setTodolistLoadingStatusAC('loading', todolistID));
  todolistAPI.updateTodo(todolistID, title).then(res => {
    dispatch(changeTodolistTitleAC(todolistID, title));
    dispatch(appSetStatusAC('succeeded'));
  });
};

export const setTodolistLoadingStatusAC = (entityStatus: RequestStatusType, todolistID: string) => {
  return { type: 'SET-TODOLIST-STATUS', entityStatus, todolistID } as const;
};

type ActionType =
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistAC>
  | ReturnType<typeof appSetStatusAC>
  | ReturnType<typeof setTodolistLoadingStatusAC>
  | ReturnType<typeof appSetErrorAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
