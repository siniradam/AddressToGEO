const { getLocation, generateLocationQuery } = require("./location");

// Libs
const { sequence } = require("./queue");
const { saveFile } = require("./utils");

// # Fetcher

async function fetchBatchPins(
  { locations, client, apiKey },
  batchStartFrom,
  batchSize = 2
) {
  //
  const fetchLocation = async (query, taskId) => await getLocation(client, apiKey, query);

  // # Info
  console.log("Total Locations:", locations.length);

  // # Get batch
  const batchTo = batchStartFrom + batchSize;
  const queryBatch = locations.slice(batchStartFrom, batchTo);

  // # Create query list
  const queryList = queryBatch.map((location) => {
    return generateLocationQuery(location);
  });

  // Time Log
  console.time("Fetch");
  console.log(`Starting ${batchStartFrom} => ${batchTo}`);

  // # Fetch All Locations
  // O: 21.298s = 200~ records.
  return sequence(queryList, fetchLocation).then((results) => {
    //
    // Finish time log
    console.log("Saving:", batchStartFrom, " => ", batchTo, ", Total fetch:", batchSize);
    console.timeEnd("Fetch");

    // Save
    saveFile(`./output/geo-${batchStartFrom}-${batchTo}.json`, results);
    return batchTo;
  });

  // Next batch start cursor info;
}

module.exports = { fetchBatchPins };
