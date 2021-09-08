import { Checkbox, IconButton } from '@material-ui/core';
import { Delete, Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { TaskStatuses, TaskType } from '../../../../../api/todolist-api';
import EditTask from '../../../../components/EditTask/EditTask';
import './Task.scss';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
    <li key={props.task.id} className="task">
      <Checkbox
        size={'small'}
        color={'secondary'}
        checked={props.task.status === TaskStatuses.Completed ? true : false}
        onChange={e => onChangeHandler(e)}
        icon={<LocationOffIcon />}
        checkedIcon={<LocationOnIcon />}
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
