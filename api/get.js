const { dbRef } = require('./firebase');
// NOTE_TO_SELF: Avoid having many calculations in serverless functions as timeout is 10 secs
module.exports = async (req, res) => {
  /*
  TODO: Make sure request is coming from a whitelist of [50]
   */
  const { dbPath } = JSON.parse(req.body);
  const statusPromise = await dbRef.child(`${dbPath}`).once('value');
  const status = await statusPromise.toJSON();
  res.status(200).send(status);
};
