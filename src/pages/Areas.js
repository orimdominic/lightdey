import { AreaList, Header, FilterInput } from '../components';
import { getState } from 'ng-streets';
import { useUserLocationContext } from '../contexts';
import { useState } from 'react';
import { sortNameAsc } from '../utils/helpers';

export default function Areas() {
  const [query, setQuery] = useState('');
  const {
    selection: { state: stateName },
  } = useUserLocationContext();
  const { areas } = getState(stateName);
  const areasList = areas
    .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    .sort(sortNameAsc);
  const onQueryInputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <Header />
      <div className="py-6 text-center">
        <h2 className="mx-auto text-3xl font-medium phone:max-w-xs">
          Areas wey dey {stateName}
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
          <AreaList list={areasList} stateName={stateName} />
        </div>
      </div>
    </div>
  );
}
