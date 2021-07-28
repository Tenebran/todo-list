import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { addTodolistAC, removeTodoListAC, todoListID1, todoListID2 } from './todolists-reducers';

type ActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodoListAC>;

const initialState: TasksStateType = {
  [todoListID1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
  [todoListID2]: [
    { id: v1(), title: 'Terminator', isDone: true },
    { id: v1(), title: 'Marvel', isDone: true },
    { id: v1(), title: 'Iron Man', isDone: false },
    { id: v1(), title: 'Spider Man', isDone: false },
  ],
};

export const tasksReducers = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(list => list.id !== action.taskID),
      };
    }

    case 'ADD-TASK': {
      let newTask = [
        { id: action.id, title: action.title, isDone: false },
        ...state[action.todoListID],
      ];
      {
        return { ...state, [action.todoListID]: newTask };
      }
    }

    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(list =>
          list.id === action.taskID ? { ...list, isDone: action.isDone } : list
        ),
      };
    }

    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(list =>
          list.id === action.taskID ? { ...list, title: action.title } : list
        ),
      };
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.id]: [],
      };
    }

    case 'REMOVE-TODOLIST': {
      let stateCopy = { ...state };
      delete stateCopy[action.todolistID];
      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export const removeTaskAC = (taskID: string, todolistID: string) => {
  return { type: 'REMOVE-TASK', taskID, todolistID } as const;
};

export const addTaskAC = (title: string, todoListID: string) => {
  return { type: 'ADD-TASK', title, todoListID, id: v1() } as const;
};

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
  return { type: 'CHANGE-TASK-STATUS', taskID, isDone, todoListID } as const;
};

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
  return { type: 'CHANGE-TASK-TITLE', taskID, title, todoListID } as const;
};
