const fs = import("fs");
const path = import("path");

export default async (locatie) => JSON.parse(
    await fs.promises.readFile(path.join(__dirname, "..", "opslag", locatie + ".json"))
);