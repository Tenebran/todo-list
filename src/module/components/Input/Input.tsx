import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

type inputType = {
  callBack: (newTitle: string) => void;
};

export default function Input(props: inputType) {
  let [title, setTitle] = useState('');

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onClickHandler = () => {
    props.callBack(title);
    setTitle('');
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickHandler();
    }
  };

  return (
    <div>
      <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
      <button onClick={onClickHandler}>+</button>
    </div>
  );
}
