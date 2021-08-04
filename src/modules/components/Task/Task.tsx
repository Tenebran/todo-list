import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { TaskType } from '../../../Todolist';
import EditTask from '../EditTask/EditTask';

type TaskProps = {
  task: TaskType;
  changeTaskTitle: (taskid: string, title: string, todoListID: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void;
  removeTask: (taskId: string, TodolistId: string) => void;
  todoListID: string;
};

const Task = React.memo((props: TaskProps) => {
  const onClickHandler = () => props.removeTask(props.task.id, props.todoListID);
  const changeTaskTitle = (title: string) => {
    props.changeTaskTitle(props.task.id, title, props.todoListID);
  };

  return (
    <li>
      <Checkbox
        size={'small'}
        color={'primary'}
        checked={props.task.isDone}
        onChange={e =>
          props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
        }
      />
      <EditTask
        title={props.task.title}
        name={props.task.isDone}
        changeTaskTitle={changeTaskTitle}
      />
      <IconButton onClick={onClickHandler} color={'secondary'} size={'small'}>
        <Delete />
      </IconButton>
    </li>
  );
});

export default Task;
