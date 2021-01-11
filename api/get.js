const { dbRef } = require('./firebase');
// NOTE_TO_SELF: Avoid having many calculations in serverless functions as timeout is 10 secs
module.exports = async (req, res) => {
  const { dbPath } = JSON.parse(req.body);
  const updatesSnapshot = await dbRef
    .child(`${dbPath}`)
    .orderByValue()
    .limitToLast(5)
    .once('value');
  const updates = updatesSnapshot.toJSON();
  res.status(200).send({ updates: updates || [] });
};
