import getConfigValue from '#f/getConfigValue.js';
const stations = [].concat(...getConfigValue("stations").map((station) => station.namen));
import stringSimilarity from "string-similarity";
import vindStation from '#f/vindStation.js';

export default (stationsNaam) => vindStation(stringSimilarity.findBestMatch(stationsNaam, stations).bestMatch.target);