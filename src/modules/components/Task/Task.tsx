import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { TaskStatuses, TaskType } from '../../../api/todolist-api';
import EditTask from '../EditTask/EditTask';

type PropsType = {
  task: TaskType;
  removeTask: (taskId: string, TodolistId: string) => void;
  changeTaskTitle: (taskid: string, title: string, todoListID: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => void;
  todoListID: string;
};

const Task = React.memo((props: PropsType) => {
  const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todoListID), []);
  const changeTaskTitle = useCallback((title: string) => {
    props.changeTaskTitle(props.task.id, title, props.todoListID);
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(
      props.task.id,
      newDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      props.todoListID
    );
  };

  return (
    <li key={props.task.id}>
      <Checkbox
        size={'small'}
        color={'primary'}
        checked={props.task.status === TaskStatuses.Completed ? true : false}
        onChange={e => onChangeHandler(e)}
      />

      <EditTask
        title={props.task.title}
        name={props.task.status}
        changeTaskTitle={changeTaskTitle}
      />
      <IconButton onClick={onClickHandler} color={'secondary'} size={'small'}>
        <Delete />
      </IconButton>
    </li>
  );
});

export default Task;
