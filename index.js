// ENV
require("dotenv").config();

const { Client } = require("@googlemaps/google-maps-services-js");

// Data
const {
  data: { locations },
} = require("./input/locations.js");
const { fetchBatchPins } = require("./libs/batch.js");

// # Map Client
const client = new Client({});
const apiKey = process.env.GOOGLE_MAPS_KEY_ERDM2;

// Parameters
const batchSize = 100; //500 takes too much time, 200 bit risky (30sec), 100 seems fine.
const config = {
  client,
  apiKey,
  locations,
};

/**
 * This commented code block below is pretty dumb.
 * batchOfBatches is the number of batches to run.
 * startFrom is the starting index of the batch.
 * It runs a batch every 25 seconds.
 * The batch is 100 items long.
 * startFrom is the initial start index.
 */
//10;
const startFrom = 49900;

// //5931
// //931
// // # Queue Test.
// const batchOfBatches = 9;
// const batches = Array.from(Array(batchOfBatches).keys());
// batches.forEach((batch) => {
//   const startTime = batch * 1000 * 13;
//   const batchStart = startFrom + (batch + 1) * 100 - 100;
//   console.log("Batch:", batchStart, `Starts in (${startTime / 1000}s)`);

//   //

//   setTimeout(() => {
//     //
//     fetchBatchPins(config, batchStart, batchSize).then((log) =>
//       console.log("Next Start Index:", log, "\n")
//     );
//     //
//   }, startTime);
// });
// // <= Queue Test End.

/**
 * This commented code block below fetches a single batch.
 */

// # Single batch;
// Initiate
// fetchBatchPins(config, startFrom, 31).then((log) =>
//   console.log("Next Start Index:", log)
// );
