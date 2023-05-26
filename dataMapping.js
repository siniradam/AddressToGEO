const { pins } = require("./input/testOutput");
const { convertMapData } = require("./libs/pinDataMap");
const { saveFile } = require("./libs/utils");

saveFile("output/cities.json", convertMapData(pins));

// Sample
// {
//   "1": {
//     "id": 1,
//     "name": "ADANA",
//     "lat": 37,
//     "lng": 35.3213,
//     "districts": [
//       {
//         "id": 1055,
//         "name": "ALADAĞ",
//         "cityID": 1,
//         "lat": 37.5174975,
//         "lng": 35.8594425,
//         "neighborhoods": [
//           {
//             "id": 2028,
//             "name": "AKÖREN (MERKEZ)",
//             "cityID": 1,
//             "districtID": 1055,
//             "lat": 37.4680905,
//             "lng": 35.520409
//           },
