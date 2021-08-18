import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { todolistAPI } from '../api/todolist-api';

export default {
  title: 'API',
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodos().then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const title = 'REACT-------------------------';
  useEffect(() => {
    todolistAPI.createTodo(title).then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  let todolistId = 'e0ef948a-b9ec-4f5a-9121-f71220b722bc';
  useEffect(() => {
    todolistAPI.deleteTodo(todolistId).then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  let todolistId = '51c76eeb-07f2-4fab-a45e-15a13f89e3cd';
  const title = 'redux-------------------------';

  useEffect(() => {
    todolistAPI.updateTodo(todolistId, title).then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
