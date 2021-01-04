import { getUpdates, postUpdate } from '../utils/api';
import { useUserSelection } from '../custom-hooks/user-selection';
import { getPath, updateOpts } from '../utils/helpers';
import { useEffect, useState } from 'react';

const Updates = (props) => {
  const [updates, setUpdates] = useState([]);
  const { selection } = useUserSelection();
  const dbPath = getPath(selection);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getUpdates(dbPath, signal).then(setUpdates);
    return () => {
      controller.abort();
    };
  }, [dbPath]);

  return (
    <div>
      <ul>
        {updates && updates.length ? (
          updates.map((updt) => {
            return (
              <li data-key={updt.updatedOn} key={updt.updatedOn}>
                {updt.statusText}-{updt.updatedOn}
              </li>
            );
          })
        ) : (
          <p>No updates yet</p>
        )}
      </ul>
      {Array.from(updateOpts.keys()).map((key) => {
        return (
          <button
            onClick={(e) => postUpdate(key, dbPath).then(setUpdates)}
            key={key}
          >
            {updateOpts.get(key)}
          </button>
        );
      })}
    </div>
  );
};

export default Updates;
