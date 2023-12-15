const fs = import("fs");
const path = import("path");

export default async (input, locatie) => await fs.promises.writeFile(path.join(__dirname, "..", "opslag", locatie + ".json"), JSON.stringify(input));