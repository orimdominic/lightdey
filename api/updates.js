const { dbRef } = require('./firebase');

// NOTE_TO_SELF: Avoid having many calculations in serverless functions as timeout is 10 secs

module.exports = async (req, res) => {
  allowDev(req,res)
  const method = req.method.toLowerCase();
  switch (method) {
    case 'get':
      return await getUpdates(req, res);
    case 'post':
      return await postUpdate(req, res);
    default:
      return res.status(405).send('Method not implemented');
  }
};

async function getUpdates(req, res) {
  const { location } = req.query;
  const updatesSnapshot = await dbRef
    .child(`${location}`)
    .orderByValue()
    .limitToLast(5)
    .once('value');
  const updates = updatesSnapshot.toJSON();
  return res.status(200).send({ updates: updates || [] });
}

async function postUpdate(req, res) {
  const { location, status, updatedOn } = JSON.parse(req.body);
  await dbRef.child(`${location}/${updatedOn}`).set({ status, updatedOn });
  const latestFiveUpdatesSnapshot = await dbRef
    .child(`${location}`)
    .orderByValue()
    .limitToLast(5)
    .once('value');
  const latestFiveUpdates = latestFiveUpdatesSnapshot.toJSON();
  await dbRef.child(`${location}`).set(latestFiveUpdates);
  return res.status(200).send({ updates: latestFiveUpdates || [] });
}

function allowDev(req, res) {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  }
}
