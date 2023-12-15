import haalTripOp from '#f/haalTripOp.js';
import haalReisOp from '#f/haalReisOp.js';
import {
    eerstAankomendeGeldigeRit
} from '#f/interpreters.js';

export default async (van, naar, moment, volgRit) => {
    const reis = await haalReisOp(van.toUpperCase(), naar.toUpperCase(), new Date(moment - 2 * 60 * 1000).toISOString());
    if (!reis || !reis.trips) stop(van, naar);
    const eersVolgendeRit = eerstAankomendeGeldigeRit(reis.trips, moment, volgRit);
    if (!eersVolgendeRit) stop(van, naar);
    return eersVolgendeRit;
};

const stop = (van, naar) => {
    throw(`Geen reis gevonden van ${van} naar ${naar}.`);
};
