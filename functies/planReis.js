import vroegsteVolledigeReis from '#f/vroegsteVolledigeReis.js';
import laatsteVolledigeReis from '#f/laatsteVolledigeReis.js';
import polylineAfstand from '#f/polylineAfstand.js';
import stationsLijstPolyline from '#f/stationsLijstPolyline.js';
import coordinaatAfstand from '#f/coordinaatAfstand.js';
import zoekStation from '#f/zoekStation.js';
import vindStation from '#f/vindStation.js';
import {
    aankomstTijd,
    vertrekTijd,
    aankomstTrein,
    vertrekTrein
} from '#f/interpreters.js';
import reisStats from '#f/reisStats.js';

const berekenWachttijden = (reis) => {
    for (const station of reis) {
        if (station.vertrek && station.wacht > -1000 && !station.aankomst) station.aankomst = new Date(station.vertrek - station.wacht * 60 * 1000);
        if (station.aankomst && station.wacht > -1000 && !station.vertrek) station.vertrek = new Date(station.aankomst - - station.wacht * 60 * 1000);
    }
};

const isCompleet = (station) => {
    return station.vertrokken && station.aangekomen;
};

const slaRitDetailsOp = (vertrekstation, aankomststation, trip) => {
    vertrekstation.trein = vertrekTrein(trip);
    aankomststation.trein = aankomstTrein(trip);
    vertrekstation.vertrokken = true;
    aankomststation.aangekomen = true;
};

const berekenTijdenVoorStation = async (reis, index, nsAntwoorden) => {
    berekenWachttijden(reis);

    const station = reis[index];

    // De vertrektijd van de vorige is bekend, dus de aankomsttijd van huidige kan worden berekend
    if (!station.aankomst && index > 0 && reis[index - 1].vertrek) {
        const vorige = reis[index - 1];
        const trip = await vroegsteVolledigeReis(vorige.code, station.code, vorige.vertrek, vorige.trein);
        station.aankomst = aankomstTijd(trip);
        slaRitDetailsOp(vorige, station, trip);
        nsAntwoorden.push({
            index: index * 2,
            trip: trip
        });
    }

    // De aankomsttijd in de volgende is bekend, dus de vertrektijd van huidige kan worden berekend
    if (!station.vertrek && index < reis.length - 1 && reis[index + 1].aankomst) {
        const volgende = reis[index + 1];
        const trip = await laatsteVolledigeReis(station.code, volgende.code, volgende.aankomst, volgende.trein)
        station.vertrek = vertrekTijd(trip);
        slaRitDetailsOp(station, volgende, trip);
        nsAntwoorden.push({
            index: index * 2 + 1,
            trip: trip
        });
    }
};

const planReis = async (reisplan) => {
    const reis = reisplan.reis;
    for (const station of reis) {
        if (station.vertrek) station.vertrek = new Date(station.vertrek);
        if (station.aankomst) station.aankomst = new Date(station.aankomst);
        if (!station.wacht) station.wacht = 2;
        station.code = zoekStation(station.station).code;
    }

    if (!reis.some(station => station.vertrek || station.aankomst)) reisplan.reis[0].vertrek = new Date();
    reis[0].aangekomen = true;
    reis[reis.length - 1].vertrokken = true;

    const nsAntwoorden = [];
    let i = 0;
    while (!reis.every(isCompleet)) {
        for (const [index, _] of reis.entries()) {
            await berekenTijdenVoorStation(reis, index, nsAntwoorden);
        }

        if (i++ > reis.length + 1) {
            throw "Ongeldig reisplan.";
        }
    }

    const trips = nsAntwoorden
        .sort((a, b) => a.index - b.index)
        .map(trip => trip.trip);

    return reisStats(trips);
};

export default planReis;