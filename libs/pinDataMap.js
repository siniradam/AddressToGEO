function convertMapData(pins) {
  const neighborhoods = [];
  const districts = {};
  const cities = {};

  pins.forEach((pin) => {
    const cityId = pin.components.city.id;
    const districtId = pin.components.district.id;
    const neighborhoodId = pin.components.neighborhood.id;
    const location = pin.geometry.location;

    //Cities
    if (cities[cityId] === undefined) {
      cities[cityId] = {
        id: cityId,
        name: pin.components.city.name,
        districts: [],
      };
    }

    //Districts
    if (districts[districtId] === undefined) {
      districts[districtId] = {
        id: districtId,
        name: pin.components.district.name,
        cityId,
        neighborhoods: [],
      };
    }

    //Neighborhoods
    neighborhoods.push({
      id: neighborhoodId,
      name: pin.components.neighborhood.name,
      cityId,
      districtId,
      lat: location.lat,
      lng: location.lng,
    });

    //
  });

  neighborhoods.forEach((neighborhood) => {
    districts[neighborhood.districtId].neighborhoods.push(neighborhood);
  });

  Object.keys(districts).forEach((districtId) => {
    const district = districts[districtId];
    cities[district.cityId].districts.push(district);
  });

  return cities;
}

module.exports = { convertMapData };
