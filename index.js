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

import haalDataOp from '#f/haalDataOp.js';

export default async (nsapi) => {
    const spoorkaart = await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/', nsapi);
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations', nsapi);

    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        namen: [station.namen.kort, station.namen.middel, station.namen.lang, station.code.toLowerCase(), ...station.synoniemen],
        coordinaat: [station.lng, station.lat]
    }));

    const config = {ns_app_key_primary: nsapi}

    setConfig(geformatterdestations, 'stations');
    setConfig(spoorkaart, 'spoorkaart');
    setConfig(config, 'config');

    const planReis = await import('#f/planReis.js');
    const multiReis = await import('#f/multiReis.js');
    const formatteerReis = await import('#f/formatteerReis.js');
    const updateMultiplanner = await import('#f/updateMultiplanner.js');

    return {
        planReis,
        multiReis,
        formatteerReis,
        updateMultiplanner
    };
};
