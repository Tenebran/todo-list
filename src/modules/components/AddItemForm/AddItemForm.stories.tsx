import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddItemForm from './AddItemForm';

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: (title: string) => {},
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = args => <AddItemForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  addItem: action('Button inside form clicked'),
};
