import { useHistory } from 'react-router-dom';
import { useUserLocationContext } from '../contexts';
import PropTypes from 'prop-types';

Street.propTypes = {
  street: PropTypes.object.isRequired,
};

export default function Street(props) {
  const { name } = props.street;
  const history = useHistory();
  const { setStreet } = useUserLocationContext();

  const handleSelectStreet = (streetName) => {
    setStreet(streetName);
    history.push('/updates');
  };

  return (
    <button
      onClick={(e) => handleSelectStreet(name)}
      className="m-2 text-left transition-colors duration-200 ease-in-out delay-75 border border-gray-300 rounded-sm cursor-pointer focus:outline-none focus:border-black hover:border-black"
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
}
