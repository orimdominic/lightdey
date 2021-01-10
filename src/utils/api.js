const apiUrl = '/api';

async function getUpdates(dbPath) {
  try {
    const streetStatusPromise = await fetch(`${apiUrl}/get`, {
      method: 'POST',
      body: JSON.stringify({
        dbPath,
      }),
    });
    const streetStatus = await streetStatusPromise.json()
    return toArray(streetStatus);
  } catch (err) {
    console.error(err);
  }
}

const toArray = (obj) => {
  return Object.values(obj)
}

export { getUpdates };
