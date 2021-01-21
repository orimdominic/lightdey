import { useHistory } from 'react-router-dom';
import { useUserLocationContext } from '../contexts';
import PropTypes from 'prop-types';

Area.propTypes = {
  area: PropTypes.object.isRequired,
};

export default function Area(props) {
  const { name, type, streets } = props.area;
  const history = useHistory();
  const { setArea } = useUserLocationContext();

  const handleSelectArea = (areaName) => {
    setArea(areaName);
    history.push('/streets');
  };

  return (
    <button
      onClick={(e) => handleSelectArea(name)}
      className="m-2 text-left transition-colors duration-200 ease-in-out delay-75 border border-gray-300 rounded-sm cursor-pointer focus:outline-none focus:border-black hover:border-black"
    >
      <div className="flex items-center h-full p-4 ">
        <div className="flex-grow">
          <span className="inline-block text-lg font-medium text-black">
            {name}
          </span>{' '}
          <span className="inline-block ml-2 text-base text-black">{type}</span>
          <div className="text-sm text-left text-gray-800">
            {streets.length} streets available
          </div>
        </div>
      </div>
    </button>
  );
}
