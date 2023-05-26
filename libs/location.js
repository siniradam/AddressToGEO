/**
 * @typedef location
 * @property {string} address
 */

const { Client } = require("@googlemaps/google-maps-services-js");

/**
 *
 * @param {Client}
 * @param {LocationQuery} locationObject
 * @returns
 */
async function getLocation(client, apiKey, locationObject) {
  return client
    .geocode({
      params: {
        address: locationObject.address,
        key: apiKey,
      },
    })
    .then((response) => {
      let result = locationResultParser(response);
      return { ...locationObject, ...result };
    })
    .catch((err) => {
      console.error();
      const error = locationErrorHandler(err);
      return { ...locationObject, error };
    });
}

function locationResultParser(response) {
  const data = response.data;

  // No result.
  if (data.results.length === 0) {
    return {
      error: {
        status: 404,
      },
    };

    // Parse
  } else {
    return {
      formatted_address: data.results[0].formatted_address,
      geometry: data.results[0].geometry,
    };
  }
}

function locationErrorHandler(err) {
  return {
    code: err.response.status,
    status: err.response.data.status,
    message: err.response.data.error_message,
  };
}

/**
 *
 * @param {Neighborhood} neighborhood
 * @param {Disctrict} district
 * @param {City} city
 * @returns {LocationQuery}
 */
function generateAddress(neighborhood, district, city) {
  // Joined Address
  const address = `${neighborhood.name}, ${district.name}, ${city.name}, Turkey`;

  //Location Components
  const components = {
    neighborhood: {
      name: neighborhood.name,
      id: neighborhood.id,
    },
    district: {
      name: district.name,
      id: district.id,
    },
    city: {
      name: city.name,
      id: city.id,
    },
  };
  return { address, components };
}

function generateLocationQuery(location) {
  const address = `${location.neighborhoodName}, ${location.districtName}, ${location.cityName}, Turkey`;

  const components = {
    neighborhood: {
      name: location.neighborhoodName,
      id: location.neighborhoodId,
    },
    district: {
      name: location.districtName,
      id: location.districtId,
    },
    city: {
      name: location.cityName,
      id: location.cityId,
    },
  };
  return { address, components };
}

/**
 * Dummy location object for testing purposes.
 */
const dummyLocation = {
  neighborhood: {
    id: 2028,
    districtId: 1055,
    name: "AKÖREN (MERKEZ)",
    type: "neighborhood",
  },
  district: { id: 1055, name: "ALADAĞ", type: "district", cityID: 1 },
  city: { id: 1, name: "ADANA", type: "city" },
};

/**
 * @typedef {Object} Neighborhood
 * @property {number} id
 * @property {string} name
 *
 * @typedef {Object} Disctrict
 * @property {number} id
 * @property {string} name
 *
 *
 * @typedef {Object} City
 * @property {number} id
 * @property {string} name
 *
 * @typedef {Object} LocationQuery
 * @property {string} address Joined string: neighborhood.name, district.name, city.name, Turkey`
 * @property {Object} components joined address components
 * @property {Neighborhood} components.neighborhood Neighborhood object
 * @property {District} components.district District object
 * @property {City} components.city City object
 *
 */

module.exports = {
  dummyLocation,
  getLocation,
  generateAddress,
  generateLocationQuery,
};
