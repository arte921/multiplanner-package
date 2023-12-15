const getConfigValue = import('#f/getConfigValue.js');
const stations = [].concat(...getConfigValue("stations").map((station) => station.namen));
const stringSimilarity = import("string-similarity");
const vindStation = import('#f/vindStation.js');

export default (stationsNaam) => vindStation(stringSimilarity.findBestMatch(stationsNaam, stations).bestMatch.target);