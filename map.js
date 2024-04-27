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

  const originAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById("origin")
  );

  const destinationAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById("destination")
  );

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

  function calculateAndDisplayRoute() {
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;

    console.log(origin);
    console.log(destination);
    if (!origin || !destination) {
      return;
    }

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.TRANSIT,
    };

    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        console.log(response);
        directionsRenderer.setDirections(response);
      } else {
        console.error(
          "The path creation failed with the following error: ",
          status
        );
      }
    });
  }

  originAutocomplete.addListener("place_changed", calculateAndDisplayRoute);
  destinationAutocomplete.addListener(
    "place_changed",
    calculateAndDisplayRoute
  );
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
