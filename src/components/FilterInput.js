import React from 'react';

import PropTypes from 'prop-types';

export const FilterInput = (props) => {
  const { query, placeholder, onInputChange } = props;
  return (
    <div className="mx-auto">
      <div className="max-w-sm mx-auto mb-4 phone:max-w-xs">
        <label htmlFor="stateFilterInput" className="sr-only">
          {placeholder}
        </label>
        <input
          value={query}
          onChange={onInputChange}
          type="text"
          inputMode="text"
          id="stateFilterInput"
          name="stateFilterInput"
          placeholder={placeholder}
          className="w-full px-3 py-1 text-base leading-8 text-gray-800 transition-colors duration-200 ease-in border border-gray-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
        />
      </div>
    </div>
  );
};
FilterInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  query: PropTypes.string.isRequired,
};
