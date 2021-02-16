import React from 'react';
import PropTypes from 'prop-types';
import { StreetItem } from './';

export const StreetList = (props) => {
  const { list } = props;

  return (
    <>
      {list.length &&
        list.map((st) => (
          <StreetItem
            key={st.name.toLowerCase().replace(' ', '-')}
            street={st}
          />
        ))}
    </>
  );
};
StreetList.propTypes = {
  list: PropTypes.array.isRequired,
};
