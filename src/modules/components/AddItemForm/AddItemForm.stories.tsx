import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddItemForm from './AddItemForm';

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={action('Button inside form clicked')} />;
};

export const AddItemFormDisableBasedExample = (props: any) => {
  return <AddItemForm addItem={action('Button inside form clicked')} disabled={true} />;
};
