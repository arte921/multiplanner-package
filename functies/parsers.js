const chrono = import('chrono-node');

const bestaat = (element) => !!element && !element.match(/^(!.*| *$)/);
const parseDatumRelatief = referentiedatum => dateString => chrono.parseDate(dateString, referentiedatum);

const losseregels = (tekst) => tekst
    .split("\n")
    .filter(bestaat);

export default {
    bestaat,
    parseDatumRelatief,
    losseregels
};