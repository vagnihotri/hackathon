const functions = require('firebase-functions');
const https = require('https')
var request = require('request');

const API_ROOT = 'https://api.clevertap.com/'
const API_EVENT_UPLOAD = '1/upload'
const HEADER_ACCOUNT_ID = 'X-CleverTap-Account-Id'
const HEADER_ACCOUNT_PASSCODE = 'X-CleverTap-Passcode'

exports.webhookfn = functions.https.onRequest((request, response) => {
  uploadEvent1(request);
  response.send(200);
});

// function uploadEvent(_request) {


//  console.log('headers :', _request.headers)


// const data = JSON.stringify(_request.body);


// const options = {
//   hostname: API_ROOT, 
//   //port: 443,
//  path: API_EVENT_UPLOAD,
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     HEADER_ACCOUNT_ID: _request.get(HEADER_ACCOUNT_ID),
//     HEADER_ACCOUNT_PASSCODE: _request.get(HEADER_ACCOUNT_PASSCODE)
//   }
//   // body: data
// }

//  console.log('headers :', options)

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.write(data)
// req.end()

// }


function uploadEvent1(_request) {

const data = JSON.stringify(_request.body);

	var   headers = {
    'Content-Type': 'application/json',
    'X-CleverTap-Account-Id': _request.get(HEADER_ACCOUNT_ID),
    'X-CleverTap-Passcode': _request.get(HEADER_ACCOUNT_PASSCODE)
  }

    console.log(headers);

	var options = {
    url: API_ROOT + API_EVENT_UPLOAD, //'https://api.clevertap.com/1/upload',
    method: 'POST',
    headers: headers,
    body: data
};

    console.log(options);

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    } else{
    	console.log(body);
    	// console.log(response);
    }
}

request(options, callback);
}