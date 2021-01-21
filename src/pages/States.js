import { StateList, Header, FilterInput } from '../components';
import { getStates } from 'ng-streets';
import { useState } from 'react';

const ngStates = getStates();

export default function States() {
  const [query, setQuery] = useState('');
  const [allStates] = useState(ngStates);
  const onQueryInputChange = (e) => {
    setQuery(e.target.value);
  };
  const statesList = allStates.filter((st) =>
    st.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <Header />
      <div className="py-6 text-center">
        <h2 className="mx-auto text-3xl font-medium phone:max-w-xs">
          Naija States
        </h2>
      </div>
      <div className="px-5 mx-auto sm:px-12">
        <FilterInput
          onInputChange={onQueryInputChange}
          placeholder="Spell the state name"
          query={query}
        />
      </div>
      <div className="px-5 mx-auto sm:px-12">
        <div className="grid pt-6 pb-12 -m-2 phone:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <StateList list={statesList} />
        </div>
      </div>
    </div>
  );
}
