import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringToId } from '../utils/helpers';
import PropTypes from 'prop-types';

export const StreetItem = (props) => {
  const { name } = props.street;
  const history = useHistory();
  const { pathname } = useLocation();

  const handleSelectStreet = ({ streetName, history, pathname }) => {
    const streetId = stringToId(streetName);
    history.push(`${pathname}/${streetId}`);
  };

  return (
    <button
      onClick={(e) =>
        handleSelectStreet({ streetName: name, history, pathname })
      }
      className="m-2 text-left transition-colors ease-in-out border border-gray-300 rounded-sm outline-none hover:bg-mustard-300 focus:outline-none focus:border-black"
    >
      <div className="flex items-center justify-center h-full p-4 ">
        <div className="flex-grow text-center">
          <span className="inline-block text-lg font-medium text-black">
            {name}
          </span>
        </div>
      </div>
    </button>
  );
};

StreetItem.propTypes = {
  street: PropTypes.object.isRequired,
};
