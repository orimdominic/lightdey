import { useHistory } from 'react-router-dom';
import { useUserSelection } from '../custom-hooks/user-selection';
import { getRandomNumber } from '../utils/helpers';

export default function State(props) {
  const { geoPol, areas, name } = props.state;
  const history = useHistory();
  const { setState } = useUserSelection();

  const navigateTo = (path) => {
    // make this a helper
    history.push(path);
  };

  const onSelectState = (stateName) => {
    const overlayShowTime = getRandomNumber(400, 800);
    setState(stateName);
    props.toggleOverlay(true);
    const timerId = window.setTimeout(() => {
      props.toggleOverlay(false);
      window.clearTimeout(timerId);
      navigateTo('/areas');
    }, overlayShowTime);
  };

  return (
    <button
      onClick={(e) => onSelectState(name)}
      className="m-2 text-left transition-colors duration-200 ease-in-out delay-75 border border-gray-300 rounded-sm cursor-pointer focus:outline-none focus:border-black hover:border-black"
    >
      <div className="flex items-center h-full p-4 ">
        <div className="flex-grow">
          <p className="text-lg font-medium text-black">{name}</p>
          <div className="text-sm text-left text-gray-800">
            <span className="inline-block">{geoPol}</span>
            <span className="inline-block mx-2">⦁</span>
            <span className="inline-block">{areas.length} areas available</span>
          </div>
        </div>
      </div>
    </button>
  );
}
