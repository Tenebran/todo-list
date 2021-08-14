import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from './App';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';

export default {
  title: 'Todolist/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const BaseExample = Template.bind({});
