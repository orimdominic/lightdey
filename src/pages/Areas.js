import { AreaList, Header, FilterInput } from '../components';
import { useParams } from 'react-router-dom';
import { getStates } from 'ng-streets';
import React, { useState } from 'react';
import { sortNameAsc, stringToId } from '../utils/helpers';

export const Areas = () => {
  const [query, setQuery] = useState('');
  const { stateId } = useParams();
  const { name: stateName, areas } = getStates().find(
    (s) => stringToId(s.name) === stateId
  );
  // TODO: Check if stateName is undefined here
  const areasList = areas
    .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    .sort(sortNameAsc);
  const onQueryInputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <Header />
      <div className="max-w-screen-xl mx-auto">
        <div className="py-6 text-center ">
          <h2 className="mx-auto text-3xl font-medium phone:max-w-xs">
            Areas wey dey for <span className="block"> {stateName}</span>
          </h2>
        </div>
        <div className="px-5 mx-auto sm:px-12">
          <FilterInput
            onInputChange={onQueryInputChange}
            placeholder="Spell the area name"
            query={query}
          />
        </div>
        <div className="px-5 mx-auto sm:px-12">
          <div className="grid pt-6 pb-12 -m-2 phone:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <AreaList list={areasList} />
          </div>
        </div>
      </div>
    </div>
  );
};
