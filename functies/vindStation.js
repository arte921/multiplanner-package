const readJSONSync = import('#f/readJSONSync.js');
const stations = readJSONSync("stations");

export default (stationsNaam) => stations.find((kandidaatStation) => kandidaatStation.namen.includes(stationsNaam));