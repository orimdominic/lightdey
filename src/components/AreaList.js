import React from 'react';
import PropTypes from 'prop-types';
import { AreaItem } from './';

export const AreaList = (props) => {
  const { list } = props;
  return (
    <>
      {list.length ? (
        props.list.map((a) => (
          <AreaItem key={a.name.toLowerCase().replace(' ', '-')} area={a} />
        ))
      ) : (
        <div>No areas available</div>
      )}
    </>
  );
};

AreaList.propTypes = {
  list: PropTypes.array.isRequired,
};
