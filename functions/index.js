const functions = require('firebase-functions');
const uploadModule = require('./uploadEvents');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((request, res) => {

    if (request.method === 'PUT') {
        return res.status(403).send('Forbidden!');
    }

    const cors = require('cors')({
        origin: true,
    });

    return cors(request, res, () => {
        console.log(request.method);
        console.log(request.body);
        console.log(request.query);




        var profiles = request.body.profiles;
        var type;

        if (typeof profiles !== 'undefined' && profiles.length > 0) {
            type = profiles[0].key_values["type"];
        }

        var payload = [];

        profiles.forEach(profile => {
            let kv = profile.key_values;
            if (type === "event") {
                let event = {};
                if (typeof profile.objectId !== 'undefined') {
                    event["objectId"] = profile.objectId;
                } else if (typeof profile.identity !== 'undefined') {
                    event["identity"] = profile.identity;
                } else if (typeof profile.email !== 'undefined') {
                    event["identity"] = profile.email;
                }
                event["type"] = kv["type"]
                event["evtName"] = kv["evtName"]
                if (typeof kv["ts"] !== 'undefined') {
                    event["ts"] = kv["ts"]
                }
                event["evtData"] = {};
                for (var key in kv) {
                    if (kv.hasOwnProperty(key)) {
                        if (key.startsWith("evtData")) {
                            event["evtData"][key.substring(8)] = kv[key];
                        }
                    }
                }
                payload.push(event);

                let events = {
                    "d": payload
                }
                res.send(uploadModule.callApi(events, request.get('X-CleverTap-Account-Id'), request.get('X-CleverTap-Passcode')));
            }
        });
    });





});