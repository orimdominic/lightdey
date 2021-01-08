import { useState } from 'react';
import { getStates } from 'ng-streets';
import { Link } from 'react-router-dom';
import { useUserSelection } from '../custom-hooks/user-selection';

const StateList = (props) => {
  const ngStates = getStates();
  const { setState } = useUserSelection();
  const [query, setQuery] = useState('');

  const persistSelState = (selState) => {
    setState(selState);
  };
  return (
    <>
      <label htmlFor="stateInput">
        <input
          type="text"
          id="stateInput"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
          placeholder="Filter state"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </label>
      {ngStates &&
        ngStates
          .filter((st) => st.toLowerCase().includes(query.toLowerCase()))
          .map((st) => (
            <Link
              to="/areas"
              key={st.toLowerCase().replace(' ', '-')}
              className="border-gray-400 flex flex-row mb-2"
            >
              <button onClick={(e) => persistSelState(st)} className="w-full">
                <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">{st}</div>
                  </div>
                </div>
              </button>
            </Link>
          ))}
    </>
  );
};

export default StateList;
