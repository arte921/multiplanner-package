const fs = import("fs");
const path = import("path");

export default (locatie) => JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "opslag", locatie + ".json"))
);