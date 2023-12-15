#!/usr/bin/env node

const fs = import('fs');
const path = import('path');
const formatteerReis = import('.#f/functies/formatteerReis.js');
const readJSON = import('.#f/functies/readJSON');

const {
    multiReis
} = import(".#f/index.js");

const planReis = import('.#f/functies/planReis.js');

(async () => {
    const file = process.argv[2];
    if (!file) return console.log("Geef een bestand op met de reis");
    const rawRoute = (await fs.promises.readFile(path.join(process.cwd(), process.argv[2]))).toString();
    if (!rawRoute) return console.log("Bestand niet gevonden.");
    const reisplan = multiReis(rawRoute);
    const reis = await planReis(reisplan);
    const reisScriptNederlands = formatteerReis(reis);
    console.log(reisScriptNederlands);
})();