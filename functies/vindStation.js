const getConfigValue = import('#f/getConfigValue.js');
const stations = getConfigValue("stations");

export default (stationsNaam) => stations.find((kandidaatStation) => kandidaatStation.namen.includes(stationsNaam));