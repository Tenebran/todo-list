import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TaskStatuses, todolistAPI } from '../../api/todolist-api';

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

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [todolistID, setTodolistID] = useState<string>('');

  const createTask = () => {
    todolistAPI.createTask(todolistID, title).then(res => {
      setState(res.data);
      setTodolistID('');
      setTitle('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={'Todolist ID'}
        value={todolistID}
        onChange={e => setTodolistID(e.currentTarget.value)}
      />
      <input
        placeholder={'Give Task Name'}
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <button onClick={createTask}>Create Task</button>
    </div>
  );
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>('');

  const createTodolist = () => {
    todolistAPI.createTodo(title).then(res => {
      setState(res.data);
      setTitle('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={'Give Todolist Name'}
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <button onClick={createTodolist}>Create Todo</button>
    </div>
  );
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState<string>('');

  const deletetodolist = () => {
    todolistAPI.deleteTodo(todolistID).then(res => {
      setState(res.data);
      setTodolistID('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={'todolistID'}
          value={todolistID}
          onChange={e => setTodolistID(e.currentTarget.value)}
        />
        <button onClick={deletetodolist}>delete todolist</button>
      </div>
    </div>
  );
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [userTitle, setUserTitle] = useState<string>('');
  const [todolistId, setTodoListId] = useState<string>('');

  const updateTodolistTitle = () => {
    todolistAPI.updateTodo(todolistId, userTitle).then(res => {
      setState(res.data);
      setUserTitle('');
      setTodoListId('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={'Todolist ID'}
        value={todolistId}
        onChange={e => setTodoListId(e.currentTarget.value)}
      />
      <input
        placeholder={'Give Title'}
        value={userTitle}
        onChange={e => setUserTitle(e.currentTarget.value)}
      />
      <button onClick={updateTodolistTitle}>Send</button>
    </div>
  );
};

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [title, setTaskTitle] = useState<any>('');

  const updateTaskTitle = () => {
    todolistAPI.updateTask(todolistId, taskId, { title }).then(res => {
      setState(res.data);
      setTodolistId('');
      setTaskId('');
      setTaskTitle('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={'Todolist ID'}
        value={todolistId}
        onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <input
        placeholder={'Task ID'}
        value={taskId}
        onChange={e => setTaskId(e.currentTarget.value)}
      />
      <input
        placeholder={'Give New Name'}
        value={title}
        onChange={e => setTaskTitle(e.currentTarget.value)}
      />
      <button onClick={updateTaskTitle}>Change Task Name</button>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState<string>('');

  const getTask = () => {
    todolistAPI.getTasks(todolistID).then(res => {
      setState(res.data);
      setTodolistID('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={'Todolist ID'}
        value={todolistID}
        onChange={e => setTodolistID(e.currentTarget.value)}
      ></input>
      <button onClick={getTask}>Get Task</button>
    </div>
  );
};

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState<string>('');
  const [taskID, setTaskID] = useState<string>('');

  const deleteTask = () => {
    todolistAPI.deleteTasks(todolistID, taskID).then(res => {
      setState(res.data);
      setTodolistID('');
      setTaskID('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={'TodolistID'}
        value={todolistID}
        onChange={e => setTodolistID(e.currentTarget.value)}
      />
      <input
        placeholder={'Task ID'}
        value={taskID}
        onChange={e => setTaskID(e.currentTarget.value)}
      />
      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
};
