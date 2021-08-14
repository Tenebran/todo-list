import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Task from './Task';

export default {
  title: 'Example/Task',
  component: Task,
  argTypes: {
    removeTask: (taskId: string, TodolistId: string) => {},
    changeTaskTitle: (taskid: string, title: string, todoListID: string) => {},
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => {},
  },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = args => (
  <>
    <Task {...args} task={{ id: '1', title: 'HTML&CSS', isDone: true }} todoListID={'1'} />
    <Task {...args} task={{ id: '2', title: 'React', isDone: false }} todoListID={'2'} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  removeTask: action('Button remove Task clicked'),
  changeTaskTitle: action('Button chageTitle Task clicked'),
  changeTaskStatus: action('Button changeStatus Task clicked'),
};
