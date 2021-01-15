import { updatesToUi } from './helpers';

const apiUrl = '/api';

async function getUpdates(dbPath, signal) {
  try {
    const streetUpdates = await fetch(`${apiUrl}/get?location=${dbPath}`, {
      method: 'GET',
      signal,
    });
    const { updates } = await streetUpdates.json();
    return !!updates ? updatesToUi(updates) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function postUpdate(status, dbPath) {
  const updatedOn = Date.now();
  try {
    const streetUpdates = await fetch(`${apiUrl}/post`, {
      method: 'POST',
      body: JSON.stringify({
        dbPath,
        status,
        updatedOn,
      }),
    });
    const { updates } = await streetUpdates.json();
    return updatesToUi(updates);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { getUpdates, postUpdate };
