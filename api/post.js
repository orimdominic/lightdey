const { dbRef } = require('./firebase');
// NOTE_TO_SELF: Avoid having many calculations in serverless functions as timeout is 10 secs
module.exports = async (req, res) => {
  const { dbPath, status, updatedOn } = JSON.parse(req.body);
  await dbRef.child(`${dbPath}/${updatedOn}`).set({ status, updatedOn });
  const latestFiveUpdatesSnapshot = await dbRef
    .child(`${dbPath}`)
    .orderByValue()
    .limitToLast(5)
    .once('value');
  const latestFiveUpdates = latestFiveUpdatesSnapshot.toJSON();
  await dbRef.child(`${dbPath}`).set(latestFiveUpdates);
  res.status(200).send({ updates: latestFiveUpdates || [] });
};
