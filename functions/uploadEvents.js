var request = require('request');


exports.callApi = function(event, actId, passcode, region) {

    return new Promise((resolve, reject) => {
        var headers = {
            'X-CleverTap-Account-Id': actId,
            'X-CleverTap-Passcode': passcode,
            'Content-Type': 'application/json; charset=utf-8'
        };

        var dataString = JSON.stringify(event);

        var options = {
            url: `https://${region}.api.clevertap.com/1/upload`,
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(response);
            } else {
                reject(error);
            }
        }

        request(options, callback);
    });
    
}