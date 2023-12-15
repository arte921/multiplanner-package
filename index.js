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

const haalDataOp = import('#f/haalDataOp.js');

export default async (nsapi) => {
    const spoorkaart = await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/', nsapi);
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations', nsapi);

    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        namen: [station.namen.kort, station.namen.middel, station.namen.lang, station.code.toLowerCase(), ...station.synoniemen],
        coordinaat: [station.lng, station.lat]
    }));

    setConfig(geformatterdestations, 'stations');
    setConfig(spoorkaart, 'spoorkaart');
    setConfig(config, 'config');

    const planReis = import('#f/functies/planReis.js');
    const multiReis = import('#f/functies/multiReis.js');
    const formatteerReis = import('#f/functies/formatteerReis.js');
    const updateMultiplanner = import('#f/functies/updateMultiplanner.js');

    return {
        planReis,
        multiReis,
        formatteerReis,
        updateMultiplanner
    };
};
