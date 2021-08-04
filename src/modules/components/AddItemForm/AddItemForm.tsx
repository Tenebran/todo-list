import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type addItemForPropsType = {
  addItem: (title: string) => void;
};

const AddItemForm = React.memo((props: addItemForPropsType) => {
  let [title, setTitle] = useState('');
  let [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
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
