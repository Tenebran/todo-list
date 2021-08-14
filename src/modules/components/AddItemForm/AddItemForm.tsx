import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

type addItemForPropsType = {
  addItem: (title: string) => void;
};

const AddItemForm = React.memo((props: addItemForPropsType) => {
  console.log('add ItemForm');
  let [title, setTitle] = useState('');
  let [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    if (error !== null) {
      setError(null);
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
    setError(null);
  };

  return (
    <div>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label={error ? error : 'Type Text'}
        variant={'outlined'}
        size={'small'}
        error={!!error}
        helperText={error ? error : ''}
      />
      <IconButton onClick={addItem} color={'primary'} size={'small'}>
        <AddBox fontSize={'large'} />
      </IconButton>
    </div>
  );
});

export default AddItemForm;
