import haalDataOp from '#f/haalDataOp.js';

export default async (ctxRecon) => await haalDataOp(`/reisinformatie-api/api/v3/trips/trip?ctxRecon=${ctxRecon}&passing=true`);