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
      console.log(req.headers);
      console.log();

      
      var request = require('request');

      var headerData = req.headers;
      var dataString = JSON.stringify(req.body);
      var options = {
          url: 'https://api.clevertap.com/1/upload',
          method: 'POST',
          headers: req.headers,
          body: dataString
      };

      function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }

      request(options, callback);
      res.send(200);
    });
});