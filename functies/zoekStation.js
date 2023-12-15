const readJSONSync = import('#f/readJSONSync.js');
const stations = [].concat(...readJSONSync("stations").map((station) => station.namen));
const stringSimilarity = import("string-similarity");
const vindStation = import('#f/vindStation.js');

export default (stationsNaam) => vindStation(stringSimilarity.findBestMatch(stationsNaam, stations).bestMatch.target);