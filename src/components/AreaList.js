import { getState } from 'ng-streets';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserSelection } from '../custom-hooks/user-selection';

const AreaList = (props) => {
  const {
    selection: { state },
    setArea,
  } = useUserSelection();
  const { areas } = getState(state);
  const [query, setQuery] = useState('');

  const persistSelArea = (selArea) => {
    setArea(selArea);
  };

  return (
    <>
      <label htmlFor="areaInput">
        <input
          type="text"
          id="areaInput"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
          placeholder="Filter area"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </label>
      {areas &&
        areas
          .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
          .map((a) => (
            <Link
              to="/streets"
              key={a.name.toLowerCase().replace('/', ' ').replace(' ', '-')}
              className="border-gray-400 flex flex-row mb-2"
            >
              <button
                onClick={(e) => persistSelArea(a.name)}
                className="w-full"
              >
                <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">{a.name}</div>
                  </div>
                </div>
              </button>
            </Link>
          ))}
    </>
  );
};

export default AreaList;
