import { getState } from 'ng-streets';
import { useState } from 'react';
import { StreetList, Header, FilterInput } from '../components';
import { useUserLocationContext } from '../contexts';
import { sortNameAsc } from '../utils/helpers';

export default function Streets() {
  const [query, setQuery] = useState('');
  const {
    selection: { area: areaName, state: stateName },
  } = useUserLocationContext();
  const { areas } = getState(stateName);
  const area = areas.find(
    (a) => a.name.toLowerCase() === areaName.toLowerCase()
  );
  const streetList = area.streets
    .filter((st) => st.name.toLowerCase().includes(query.toLowerCase()))
    .sort(sortNameAsc);
  const onQueryInputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <Header />
      <div className="py-6 text-center">
        <h2 className="mx-auto text-3xl font-medium phone:max-w-xs">
          Streets wey dey {area.name}
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
        <div className="grid pt-6 pb-12 -m-2 phone:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <StreetList list={streetList} />
        </div>
      </div>
    </div>
  );
}
