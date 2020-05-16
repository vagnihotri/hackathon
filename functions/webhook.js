const functions = require('firebase-functions');

const cors = require('cors')({
    origin: true,
  });
  
exports.webhookfn = functions.https.onRequest((req, res) => {
    if (req.method === 'PUT') {
      return res.status(403).send('Forbidden!');
    }
    return cors(req, res, () => {
      console.log(req.method);
      console.log(req.body);
      console.log(req.query);
      res.send(200);
    });
});