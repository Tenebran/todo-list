import React, { ChangeEvent, useState } from 'react';

type EditTaskProps = {
  title: string;
  name?: boolean;
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
    <input value={title} autoFocus onBlur={offEditMode} onChange={onChangeHandler}></input>
  ) : (
    <span onDoubleClick={onEditMode} className={props.name ? 'is-done' : ''}>
      {props.title}
    </span>
  );
}
