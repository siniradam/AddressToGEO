require("dotenv").config();

const fs = require("fs");

const { getLocation } = require("./libs/location");
const { sequence } = require("./libs/queue");
const { saveFile } = require("./libs/utils");

const wrongList = require("./output/wrong/all.json");

// # Map Client
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const apiKey = process.env.GOOGLE_MAPS_KEY_ERDM2;

// console.log(wrongList[0]);

// getLocation(client, apiKey, wrongList[0])
//   .then((fetchResult) => {
//     return {
//       cityID: fetchResult.cityID,
//       districtID: fetchResult.districtID,
//       neighborhoodID: fetchResult.neighborhoodID,
//       lat: fetchResult.geometry.location.lat,
//       lng: fetchResult.geometry.location.lng,
//     };
//   })
//   .then((r) => console.log(r));

const fetchMethod = async (location) =>
  getLocation(client, apiKey, location).then((fetchResult) => {
    return {
      cityID: fetchResult.cityID,
      districtID: fetchResult.districtID,
      neighborhoodID: fetchResult.neighborhoodID,
      lat: fetchResult.geometry.location.lat,
      lng: fetchResult.geometry.location.lng,
    };
  });

//
sequence(wrongList, fetchMethod).then((results) => {
  console.log(results);
  saveFile("./output/output-fix/fix.json", results);
});
