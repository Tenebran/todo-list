import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Task from './Task';
import { TaskPrioties, TaskStatuses } from '../../../api/todolist-api';

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {
    removeTask: (taskId: string, TodolistId: string) => {},
    changeTaskTitle: (taskid: string, title: string, todoListID: string) => {},
    changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => {},
  },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = args => (
  <>
    <Task
      {...args}
      task={{
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: '',
        completed: false,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
      }}
      todoListID={'1'}
    />
    <Task
      {...args}
      task={{
        id: '2',
        title: 'React',
        status: TaskStatuses.New,
        description: '',
        completed: false,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
      }}
      todoListID={'2'}
    />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  removeTask: action('Button remove Task clicked'),
  changeTaskTitle: action('Button chageTitle Task clicked'),
  changeTaskStatus: action('Button changeStatus Task clicked'),
};
