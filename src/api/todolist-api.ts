import axios from 'axios';

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

export const todolistAPI = {
  getTodos() {
    return instance.get<Array<TodolistType>>('/todo-lists');
  },

  createTodo(title: string) {
    return axios.post<CommonResponseType<{ item: TodolistType }>>('/todo-lists', { title });
  },

  updateTodo(todolistId: string, title: string) {
    return axios.put<CommonResponseType>(`/todo-lists/${todolistId}`, { title });
  },
  deleteTodo(todolistId: string) {
    return axios.delete<CommonResponseType>(`/todo-lists/${todolistId}`);
  },
};
