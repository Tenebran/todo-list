import axios from 'axios';
import { UpdateDomainTaskModelType } from '../modules/features/Todolists/tasks-reducers';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': 'e2aa960b-33d4-4875-9d72-648602b61592',
  },
});

export type CommonResponseType<T = {}> = {
  resultCode: number;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  data: T;
};

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPrioties;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPrioties {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type UpdateTaskType = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type GetTaskResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType>;
};

export const todolistAPI = {
  getTodos() {
    return instance.get<Array<TodolistType>>('/todo-lists');
  },

  createTodo(title: string) {
    return instance.post<CommonResponseType<{ item: TodolistType }>>('/todo-lists', { title });
  },

  updateTodo(todolistId: string, title: string) {
    return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, { title });
  },
  deleteTodo(todolistId: string) {
    return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`);
  },
  createTask(todolistId: string, taskTitile: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {
      title: taskTitile,
    });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateDomainTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  getTasks(todolistID: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistID}/tasks`);
  },
  deleteTasks(todolistID: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`);
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>(`/auth/login`, data);
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>(`/auth/me`);
  },
  logOut() {
    return instance.delete<ResponseType<{ userId?: number }>>(`/auth/login`);
  },
};
