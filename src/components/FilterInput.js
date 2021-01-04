import PropTypes from 'prop-types';

FilterInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default function FilterInput(props) {
  return (
    <div className="mx-auto">
      <div className="max-w-sm mx-auto mb-4">
        <label htmlFor="stateFilterInput" className="sr-only">
          Spell the state name
        </label>
        <input
          onChange={props.onInputChange}
          type="text"
          inputMode="text"
          id="stateFilterInput"
          name="stateFilterInput"
          placeholder={props.placeholder}
          className="w-full px-3 py-1 text-base leading-8 text-gray-800 transition-colors duration-200 ease-in border border-gray-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
        />
      </div>
    </div>
  );
}
