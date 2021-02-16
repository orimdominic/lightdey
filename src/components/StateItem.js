import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringToId } from '../utils/helpers';
import PropTypes from 'prop-types';

export const StateItem = (props) => {
  const { geoPol, areas, name } = props.state;
  const { pathname } = useLocation();
  const history = useHistory();
  const handleSelectState = ({ stateName, history, pathname }) => {
    const stateId = stringToId(stateName);
    history.push(`${pathname}/${stateId}/areas`);
  };

  return (
    <button
      onClick={(e) => handleSelectState({ stateName: name, history, pathname })}
      className="m-2 text-left transition-colors ease-in-out border border-gray-300 rounded-sm outline-none hover:bg-mustard-300 focus:outline-none focus:border-black"
    >
      <div className="flex items-center h-full p-4 ">
        <div className="flex-grow">
          <p className="text-lg font-medium text-black">{name}</p>
          <div className="text-sm text-left text-gray-800">
            <span className="inline-block">{geoPol}</span>
            <span className="inline-block mx-2">⦁</span>
            <span className="inline-block">
              {areas.length} areas dey for you
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

StateItem.propTypes = {
  state: PropTypes.shape({
    geoPol: PropTypes.string,
    areas: PropTypes.array,
    name: PropTypes.string,
  }),
};

StateItem.defaultProps = {
  state: {
    name: 'State Name',
    areas: [],
    geoPol: 'Geo-political Zone',
  },
};
