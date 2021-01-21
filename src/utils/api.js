import { sortTimeDesc } from './helpers';
import { updateStatusMap } from './constants';

let apiUrl = '/api';
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:3001' + apiUrl;
}

async function postUpdate(status, location, updatesToUi) {
  const updatedOn = Date.now();
  try {
    const streetUpdates = await fetch(`${apiUrl}/updates`, {
      method: 'POST',
      body: JSON.stringify({
        location,
        status,
        updatedOn,
      }),
    });
    const { data: updates } = await streetUpdates.json();
    return updatesToUi(updates, sortTimeDesc, updateStatusMap);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { postUpdate };
