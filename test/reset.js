const writeJSON = import('.#f/functies/writeJSON');

(async () => {
    await writeJSON({}, "spoorkaart");
    await writeJSON([], "stations");
    await writeJSON({}, "config");
})();