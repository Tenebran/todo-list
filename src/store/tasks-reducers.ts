import { v1 } from 'uuid';
import { TaskType, todolistAPI, UpdateTaskType } from '../api/todolist-api';
import { TasksStateType } from '../App';
import { addTodolistAC, removeTodoListAC, setTodolistAC } from './todolists-reducers';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';
import { appSetErrorAC, appSetStatusAC } from './app-reducer';

const initialState: TasksStateType = {};

export const tasksReducers = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS': {
      let copyState = { ...state };
      copyState[action.todolistId] = action.tasks;
      return copyState;
    }

    case 'SET-TODOLIST':
      const stateCopy1 = { ...state };
      action.todolist.forEach(list => {
        stateCopy1[list.id] = [];
      });
      return stateCopy1;

    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(list => list.id !== action.taskID),
      };
    }

    case 'ADD-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }

    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(list =>
          list.id === action.taskID ? { ...list, ...action.model } : list
        ),
      };
    }

    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: [],
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

export const addTaskAC = (task: TaskType) => {
  return { type: 'ADD-TASK', task } as const;
};

export const updateTaskAC = (
  taskID: string,
  model: UpdateDomainTaskModelType,
  todoListID: string
) => {
  return { type: 'UPDATE-TASK', taskID, model, todoListID } as const;
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return { type: 'SET-TASKS', tasks, todolistId } as const;
};

export const fetchSetTaskTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(appSetStatusAC('loading'));

  todolistAPI.getTasks(todolistId).then(resp => {
    dispatch(setTasksAC(resp.data.items, todolistId));
    dispatch(appSetStatusAC('succeeded'));
  });
};

export const deleteTaskTC = (todolistId: string, taskId: string) => (
  dispatch: Dispatch<ActionType>
) => {
  dispatch(appSetStatusAC('loading'));
  todolistAPI.deleteTasks(todolistId, taskId).then(res => {
    dispatch(removeTaskAC(taskId, todolistId));
    dispatch(appSetStatusAC('succeeded'));
  });
};

export const addTaskTC = (todolistId: string, taskTitile: string) => (
  dispatch: Dispatch<ActionType>
) => {
  dispatch(appSetStatusAC('loading'));
  todolistAPI.createTask(todolistId, taskTitile).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(addTaskAC(res.data.data.item));
      dispatch(appSetStatusAC('succeeded'));
    } else {
      if (res.data.messages.length) {
        dispatch(appSetErrorAC(res.data.messages[0]));
      } else {
        dispatch(appSetErrorAC('Some Error'));
      }
      dispatch(appSetStatusAC('failed'));
    }
  });
};

export const updateTaskTC = (
  taskID: string,
  domainModel: UpdateDomainTaskModelType,
  todoListID: string
) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(appSetStatusAC('loading'));
  const state = getState();
  const task = state.tasks[todoListID].find(task => task.id === taskID);

  if (!task) {
    console.warn('Task not found in the state');
    return;
  }
  const apimodel: UpdateTaskType = {
    title: task.title,
    description: task.description,
    completed: task.completed,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...domainModel,
  };

  todolistAPI.updateTask(todoListID, taskID, apimodel).then(res => {
    dispatch(updateTaskAC(taskID, domainModel, todoListID));
    dispatch(appSetStatusAC('succeeded'));
  });
};

type ActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof setTodolistAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof appSetErrorAC>
  | ReturnType<typeof appSetStatusAC>;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};
