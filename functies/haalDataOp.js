import https from 'https';

import getConfigValue from '#f/getConfigValue.js';

const config = getConfigValue("config");

const doeRequest = (opties) => {
    let antwoord = '';
    return new Promise ((resolve) => {
            const request = https.request(opties, (response) => {
                response.on('data', (deel) => antwoord += deel);
                response.on('end', () => {
                    const resultaat = JSON.parse(antwoord);
                    if (resultaat.statusCode == 429) {
                        setTimeout(async () => resolve((await doeRequest(opties))), 100);
                    } else {
                        resolve(resultaat);
                    }
                });
            });
            request.end();
        }
    );
};

export default async (pad, apikey = config.ns_app_key_primary) => await doeRequest({
    host: 'gateway.apiportal.ns.nl',
    path: pad,
    headers: {
        "Ocp-Apim-Subscription-Key": apikey
    }
});