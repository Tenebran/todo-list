import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type addItemForPropsType = {
  addItem: (title: string) => void;
};

export default function AddItemForm(props: addItemForPropsType) {
  let [title, setTitle] = useState('');
  let [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError(null);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addItem();
    }
  };

  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim());
    } else {
      setError('Title is requared');
    }
    setTitle('');
  };

  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addItem}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
