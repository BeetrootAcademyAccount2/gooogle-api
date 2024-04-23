const btnGetCity = document.getElementById("btnGetCity");
const cityTarget = document.getElementById("city");

let createdMap;

function initMap() {
  const location = { lat: -25, lng: 130 };
  const mapSelector = document.getElementById("map");
  map = new google.maps.Map(mapSelector, {
    zoom: 4,
    center: location,
  });

  createdMap = map;

  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

function geocodeCity(city) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: city }, (results, status) => {
    if (status === "OK" && results.length > 0) {
      placeMarker(results[0].geometry.location);
    } else {
      console.log("Error");
    }
  });
}

function placeMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: createdMap,
  });
}

btnGetCity.addEventListener("click", () => {
  const selectedCity = cityTarget.value;
  geocodeCity(selectedCity);
});
