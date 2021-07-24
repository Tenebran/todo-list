import { v1 } from 'uuid';
import { FilterValuesType, todoListType } from '../App';

type ActionType =
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>;

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
      const newTodolist: todoListType = { id: action.id, title: action.title, filter: 'all' };
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
