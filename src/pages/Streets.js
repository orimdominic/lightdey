import { getStates } from 'ng-streets';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StreetList, Header, FilterInput } from '../components';
import { sortNameAsc, stringToId } from '../utils/helpers';

export const Streets = () => {
  const [query, setQuery] = useState('');
  const { stateId, areaId } = useParams();
  const { areas } = getStates().find((s) => stringToId(s.name) === stateId);
  // TODO: Check if areas is found
  const { streets, name: areaName } = areas.find(
    (a) => stringToId(a.name) === areaId
  );
  // TODO: Check if `streets` is found
  const streetList = streets
    .filter((st) => st.name.toLowerCase().includes(query.toLowerCase()))
    .sort(sortNameAsc);
  const onQueryInputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <Header />
      <div className="max-w-screen-xl mx-auto">
        <div className="py-6 text-center">
          <h2 className="mx-auto text-3xl font-medium">
            Streets wey dey for <span className="block">{areaName}</span>
          </h2>
        </div>
        <div className="px-5 mx-auto sm:px-12">
          <FilterInput
            onInputChange={onQueryInputChange}
            placeholder="Spell the street name"
            query={query}
          />
        </div>
        <div className="px-5 mx-auto sm:px-12">
          <div className="grid pt-6 pb-12 -m-2 sm:grid-cols-2 lg:grid-cols-3">
            <StreetList list={streetList} />
          </div>
        </div>
      </div>
    </div>
  );
};
