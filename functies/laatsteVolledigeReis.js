const haalTripOp = import('#f/haalTripOp.js');
const haalReisOp = import('#f/haalReisOp.js');
const {
    laatstAankomendeGeldigeRit
} = import('#f/interpreters.js');

export default async (van, naar, moment, volgRit) => {
    const reis = await haalReisOp(van.toUpperCase(), naar.toUpperCase(), new Date(moment - - 2 * 60 * 1000).toISOString(), true);
    if (!reis || !reis.trips) stop(van, naar);
    const eersVolgendeRit = laatstAankomendeGeldigeRit(reis.trips, moment, volgRit);
    if (!eersVolgendeRit) stop(van, naar);
    return eersVolgendeRit;
};

const stop = (van, naar) => {
    throw(`Geen reis gevonden van ${van} naar ${naar}.`);
};
