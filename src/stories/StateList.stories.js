import React from 'react';
import { StateList } from '../components';
import { getStates } from 'ng-streets';

const Meta = {
  component: StateList,
  title: 'StateList',
};

const Template = (args) => <Template {...args} />;
const bindToTemplate = (Template) => Template.bind({});

export const Default = bindToTemplate(StateList);
Default.args = {
  list: StateList.defaultProps.list,
};

export const WithStates = bindToTemplate(StateList);
WithStates.args = {
  list: getStates().slice(0, 5),
};

export default Meta;
