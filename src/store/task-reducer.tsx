import { AccessTimeOutlined } from '@material-ui/icons';
import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { AddTodolistAT, RemoveTodolistsAT } from './todolists-reducers';
// import { AddTodolistType, RemoveTodolistType } from './todolists-reducer';

type RemoveTaskType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string;
};

type AddTasksType = {
  type: 'ADD-TASKS';
  title: string;
  id: string;
};

type changeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
  isDone: boolean;
  todolistId: string;
};

type changeTaskTitleType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionsTypes =
  | RemoveTaskType
  | AddTasksType
  | changeTaskStatusType
  | changeTaskTitleType
  | AddTodolistAT
  | RemoveTodolistsAT;

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      let copyState = { ...state };
      copyState[action.todolistId] = copyState[action.todolistId].filter(
        list => list.id !== action.taskId
      );
      return copyState;
    }
    case 'ADD-TASKS': {
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...state[action.id]];
      state[action.id] = newTasks;

      return { ...state };
    }
    case 'CHANGE-TASK-STATUS': {
      let tasks = state[action.todolistId];
      let task = tasks.find(list => list.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }

      return { ...state };
    }

    case 'CHANGE-TASK-TITLE': {
      let tasks = state[action.todolistId];
      let task = tasks.find(list => list.id === action.taskId);
      if (task) {
        task.title = action.title;
      }

      return { ...state };
    }
    case 'ADD-TODOLIST': {
      let copyState = { ...state, [action.todoListId]: [] };

      return copyState;
    }

    case 'REMOVE-TODOLIST': {
      let stateCopy = { ...state };
      delete stateCopy[action.todolistID];
      return stateCopy;
    }

    default:
      throw new Error("I don't understand this action type");
  }
};

export const addTaskAC = (newTodolistTitle: string, id: string): AddTasksType => {
  return {
    type: 'ADD-TASKS',
    title: newTodolistTitle,
    id,
  };
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
  return { type: 'REMOVE-TASK', taskId, todolistId: todolistId };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): changeTaskStatusType => {
  return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): changeTaskTitleType => {
  return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId };
};
