import React from 'react';
import { StateItem } from '../components';
import { getStates } from 'ng-streets';
import { MemoryRouter } from 'react-router-dom';
const Meta = {
  component: StateItem,
  title: 'StateItem',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <Template {...args} />;
const bindTemplate = (Template) => Template.bind({});

export const Default = bindTemplate(StateItem);
Default.args = {
  state: { ...StateItem.defaultProps.state },
};

export const WithAreas = bindTemplate(StateItem);
WithAreas.args = {
  state: {
    ...StateItem.defaultProps.state,
    ...getStates().find((s) => s.areas.length > 0), // Is this a proper thing to do?
  },
};

// export const WithAreas = () => (
//   <WithAreas state={{...State.defaultProps.state, areas: getStates().find((s) => s.areas.length > 0)}}/>
// )

export default Meta;
