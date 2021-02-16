import React from 'react';
import { StateItem } from './';
import PropTypes from 'prop-types';

export const StateList = (props) => {
  const NoStates = () => <span>No states in the list</span>;
  return (
    <>
      {props.list.length ? (
        props.list.map((st) => (
          <StateItem key={st.name.toLowerCase().replace(' ', '-')} state={st} />
        ))
      ) : (
        <NoStates />
      )}
    </>
  );
};

StateList.propTypes = {
  list: PropTypes.array.isRequired,
};
// TODO: Insert a user friendly UI for empty state lists
