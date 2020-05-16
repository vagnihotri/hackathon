const functions = require('firebase-functions');
const uploadModule = require('./uploadEvents');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.ctwebhookendpoint = functions.https.onRequest((request, res) => {

    if (request.method === 'PUT') {
        return res.status(403).send('Forbidden!');
    }

    const cors = require('cors')({
        origin: true,
    });

    if (typeof request.body["is_test"] !== "undefined") {
        if (request.body["is_test"] === true) {
            res.send(200);
        }
    } else {

        return cors(request, res, () => {
            var profiles = request.body.profiles;
            var type;

            if (typeof profiles !== 'undefined' && profiles.length > 0) {
                type = profiles[0].key_values["type"];
                console.log(type);
            }

            let region = profiles[0].key_values["region"];


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
                } else if (type === "profile") {
                    let userProfiles = {};
                    if (typeof profile.objectId !== 'undefined') {
                        userProfiles["objectId"] = profile.objectId;
                    } else if (typeof profile.identity !== 'undefined') {
                        userProfiles["identity"] = profile.identity;
                    } else if (typeof profile.email !== 'undefined') {
                        userProfiles["identity"] = profile.email;
                    }
                    userProfiles["type"] = kv["type"];
                    userProfiles["profileData"] = {};
                    for (var key in kv) {
                        if (kv.hasOwnProperty(key)) {
                            if (key.startsWith("profileData")) {
                                userProfiles["profileData"][key.substring(12)] = kv[key];
                            }
                        }
                    }
                    payload.push(userProfiles);

                    let events = {
                        "d": payload
                    }
                    res.send(uploadModule.callApi(events, request.get('X-CleverTap-Account-Id'), request.get('X-CleverTap-Passcode'), region));
                }
            });
        });

    }



});