import { useState } from 'react';
import { getStates } from 'ng-streets';
import State from './State';
import FilterInput from './FilterInput';
import OverlayContainer from './OverlayContainer';

export default function StateList(props) {
  const ngStates = getStates();
  const [query, setQuery] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  const onQueryInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
  };

  return (
    <>
      <FilterInput
        onInputChange={onQueryInputChange}
        placeholder="Spell the state name"
      />
      <div className="grid pt-6 pb-12 -m-2 phone:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ngStates &&
          ngStates
            .filter((st) => st.name.toLowerCase().includes(query.toLowerCase()))
            .map((st) => (
              <State
                key={st.name.toLowerCase().replace(' ', '-')}
                state={st}
                toggleOverlay={setShowOverlay}
              />
            ))}
      </div>
      {showOverlay ? <OverlayContainer /> : null}
    </>
  );
}
