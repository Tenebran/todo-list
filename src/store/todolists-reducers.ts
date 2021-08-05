import { v1 } from 'uuid';
import { FilterValuesType, todoListType } from '../App';

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';

type ActionType =
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>;

export const todoListID1 = v1();
export const todoListID2 = v1();

const initialState: Array<todoListType> = [
  { id: todoListID1, title: 'What To Learn', filter: 'all' },
  { id: todoListID2, title: 'Movie', filter: 'all' },
];

export const todoListsReducers = (
  todolists: Array<todoListType> = initialState,
  action: ActionType
): Array<todoListType> => {
  switch (action.type) {
    case REMOVE_TODOLIST: {
      return todolists.filter(todo => todo.id !== action.todolistID);
    }

    case ADD_TODOLIST: {
      const newTodolist: todoListType = { id: action.id, title: action.title, filter: 'all' };
      return [...todolists, newTodolist];
    }

    case CHANGE_TODOLIST_TITLE: {
      return todolists.map(list =>
        list.id === action.todolistID ? { ...list, title: action.title } : list
      );
    }

    case CHANGE_TODOLIST_FILTER: {
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
  return { type: REMOVE_TODOLIST, todolistID } as const;
};

export const addTodolistAC = (title: string) => {
  return { type: ADD_TODOLIST, title, id: v1() } as const;
};

export const changeTodolistTitleAC = (todolistID: string, title: string) => {
  return { type: CHANGE_TODOLIST_TITLE, todolistID, title } as const;
};

export const changeTodolistFilterAC = (todolistID: string, value: FilterValuesType) => {
  return { type: CHANGE_TODOLIST_FILTER, todolistID, value } as const;
};
