const { Client } = require("pg");
const fs = require("fs");

let filePath = "output-upto-8500";
// filePath = "output-upto-12500";
// filePath = "output-upto-14000";
// filePath = "output-upto-18000";
// filePath = "output-upto-18000";
// filePath = "output-upto-32000";
// filePath = "output-upto-38000";
// filePath = "output-upto-49931";

const fileList = fs
  .readdirSync(`./output/${filePath}`)
  .filter((file) => file.startsWith("geo-"));

const { sleep, sequence } = require("./libs/queue");
const { saveFile } = require("./libs/utils");

function createInsert(record) {
  location = record.geometry.location;

  return [
    record.components.city.id,
    record.components.district.id,
    record.components.neighborhood.id,
    record.components.neighborhood.name,
    `${location.lat}`,
    `${location.lng}`,
  ];
}

const cols = [
  "cityID",
  "districtID",
  "neighborhoodID",
  "neighborhood",
  "lat",
  "lng",
  "cityNameOriginal",
  "cityNameFetched",
];

async function saveV2() {
  const initOptions = {};
  const pgp = require("pg-promise")(initOptions);
  const cn = "postgres://postgres@localhost:5432/secim2023";
  const db = pgp(cn);

  const insertTo = async (filePath, q) => insert(pgp, db, filePath, q);
  sequence(fileList, insertTo);
}

async function insert(pgp, db, fileName, q) {
  try {
    const file = fs.readFileSync(`./output/${filePath}/${fileName}`, "utf8");
    const parsed = JSON.parse(file);
    const dataMulti = parsed.map((record) => formatData(record));

    const wrongLocations = dataMulti.filter((loc) => loc.cityNameFetched !== loc.city);

    if (wrongLocations.length) {
      saveFile(`./output/wrong/${filePath}-${q}.json`, JSON.stringify(wrongLocations));
    }
  } catch (error) {
    console.log(error);
  }

  // const query = await pgp.helpers.insert(dataMulti, cols, "locations");
  // return await db.none(query);
}

saveV2();

const r = /([\wğüşöçıİĞÜŞÖÇ]+), Türkiye/g;

function formatData(record) {
  {
    const location = record.geometry.location;
    const { city, district, neighborhood } = record.components;

    const parsedCity = record.formatted_address.match(r)[0].split(",")[0];

    return {
      neighborhoodID: neighborhood.id,
      neighborhood: neighborhood.name,
      districtID: district.id,
      district: district.name,
      cityID: city.id,
      city: city.name.toLocaleUpperCase("tr-TR").trim(),
      cityNameFetched: parsedCity.toLocaleUpperCase("tr-TR").trim(),
      lat: `${location.lat}`,
      lng: `${location.lng}`,
    };
  }
}

//OLD TEST.

// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "secim2023",
//   password: "",
//   port: 5432,
// });

async function saveV1() {
  // Connect
  await client
    .connect()
    .then((r) => console.log("OK"))
    .catch((e) => console.error(e));

  Columns;
  const cols = [
    '"cityID"',
    '"districtID"',
    '"neighborhoodID"',
    "neighborhood",
    "lat",
    "lng",
  ];

  // Query
  const query = `INSERT INTO locations(${cols.join(",")}) VALUES(${cols
    .map((i, e) => `$${e + 1}`)
    .join(",")}) RETURNING *`;

  // # Fetch file

  files.forEach(async (filePath) => {
    //
    const file = fs.readFileSync(`./output-upto-8500/${filePath}`, "utf8");
    const parsed = JSON.parse(file);

    // # Records
    for (let i = 0; i < parsed.length; i++) {
      await client.query(query, createInsert(parsed[i]));
    }
    //
    await sleep(1500); //sleep
  });

  client.end();
}

// save();
