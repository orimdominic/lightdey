import { useState } from 'react';
import { getState } from 'ng-streets';
import { Link } from 'react-router-dom';
import { useUserSelection } from '../custom-hooks/user-selection';

const StreetList = (props) => {
  const getArea = (areaName, areas) => {
    return areas.find((a) => a.name.toLowerCase() === areaName.toLowerCase());
  };
  const {
    selection: { area, state },
    setStreet,
  } = useUserSelection();
  const { areas } = getState(state);
  const { streets } = getArea(area, areas);
  const [query, setQuery] = useState('');

  const persistSelStreet = (selStreet) => {
    setStreet(selStreet);
  };

  return (
    <>
      <label htmlFor="streetInput">
        <input
          type="text"
          id="streetInput"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
          placeholder="Filter street"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </label>
      {streets &&
        streets
          .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
          .map((s) => (
            <Link
              to="/details"
              key={s.name.toLowerCase().replace('/', ' ').replace(' ', '-')}
              className="border-gray-400 flex flex-row mb-2"
            >
              <button
                onClick={(e) => persistSelStreet(s.name)}
                className="w-full"
              >
                <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">{s.name}</div>
                  </div>
                </div>
              </button>
            </Link>
          ))}
    </>
  );
};

export default StreetList;
