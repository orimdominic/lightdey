import { postUpdate } from '../utils/api';
import { useUserLocationContext } from '../contexts/useUserLocationContext';
import { getLocationString, updatesToUi, sortTimeDesc } from '../utils/helpers';
import { updateStatusMap } from '../utils/constants';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Updates () {
  let apiUrl = '/api/updates';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:3001' + apiUrl;
  }
  const [updates, setUpdates] = useState([]);
  const { selection } = useUserLocationContext();
  const location = getLocationString(selection);
  const getUpdates = async function () {
    axios
      .get(`${apiUrl}?location=${location}`)
      .then(({ data: { updates } }) => {
        const uiUpdates = updatesToUi(updates, sortTimeDesc, updateStatusMap);
        debugger
        setUpdates(uiUpdates);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUpdates();
  }, []);

  return (
    <div>
      <ul>
        {updates && updates.length ? (
          updates.map((u) => {
            return (
              <li data-key={u.updatedOn} key={u.updatedOn}>
                {u.statusText}-{u.updatedOn}
              </li>
            );
          })
        ) : (
          <p>No updates yet</p>
        )}
      </ul>
      {Array.from(updateStatusMap.keys()).map((key) => {
        return (
          <button
            onClick={(e) =>
              postUpdate(key, location, updatesToUi).then(setUpdates)
            }
            key={key}
          >
            {updateStatusMap.get(key)}
          </button>
        );
      })}
    </div>
  );
};

