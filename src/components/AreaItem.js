import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringToId } from '../utils/helpers';
import PropTypes from 'prop-types';
export const AreaItem = (props) => {
  const { name, type, streets } = props.area;
  const history = useHistory();
  const { pathname } = useLocation();
  const handleSelectArea = ({ areaName, history, pathname }) => {
    const areaId = stringToId(areaName);
    history.push(`${pathname}/${areaId}/streets`);
  };

  return (
    <button
      onClick={(e) => handleSelectArea({ areaName: name, history, pathname })}
      className="m-2 text-left transition-colors ease-in-out border border-gray-300 rounded-sm outline-none hover:bg-mustard-300 focus:outline-none focus:border-black"
    >
      <div className="flex items-center h-full p-4 ">
        <div className="flex-grow">
          <span className="inline-block text-lg font-medium text-black">
            {name}
          </span>{' '}
          <span className="inline-block ml-2 text-base text-black">{type}</span>
          <div className="text-sm text-left text-gray-800">
            Na {streets.length} streets dey for now
          </div>
        </div>
      </div>
    </button>
  );
};

AreaItem.propTypes = {
  area: PropTypes.object.isRequired,
};
