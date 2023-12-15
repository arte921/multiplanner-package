/*
 *	Made by arte921 and BennovanDorst
 *  https://github.com/Multiplanner/Multiplanner-package
 *  Multiplanner-package Version 1.0.0
 *
 *  License: MIT
 *
 *  Main index file
 */

import { setConfig } from '#f/setConfig.js';

import getConfigValue from '#f/getConfigValue.js';

export default async (nsapi) => {
    const config = {ns_app_key_primary: nsapi};
    setConfig(config, 'config');


    const haalDataOp = (await import('#f/haalDataOp.js')).default;


    const spoorkaart = await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/');
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations');

    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        namen: [station.namen.kort, station.namen.middel, station.namen.lang, station.code.toLowerCase(), ...station.synoniemen],
        coordinaat: [station.lng, station.lat]
    }));

    setConfig(geformatterdestations, 'stations');
    setConfig(spoorkaart, 'spoorkaart');
    
    const planReis = (await import('#f/planReis.js')).default;
    const multiReis = (await import('#f/multiReis.js')).default;
    const formatteerReis = (await import('#f/formatteerReis.js')).default;
    const updateMultiplanner = (await import('#f/updateMultiplanner.js')).default;

    return {
        planReis,
        multiReis,
        formatteerReis,
        updateMultiplanner
    };
};
