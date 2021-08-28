import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { TaskStatuses } from '../../../api/todolist-api';

type EditTaskProps = {
  title: string;
  name?: TaskStatuses;
  changeTaskTitle: (title: string) => void;
};

export default function EditTask(props: EditTaskProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>(props.title);

  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    props.changeTaskTitle(title);
    setEditMode(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField value={title} autoFocus onBlur={offEditMode} onChange={onChangeHandler}></TextField>
  ) : (
    <span
      onDoubleClick={onEditMode}
      className={props.name === TaskStatuses.Completed ? 'is-done' : ''}
    >
      {props.title}
    </span>
  );
}
