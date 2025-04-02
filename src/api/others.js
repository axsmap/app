import handleEndpoint from "./handle-endpoint";

export async function contactEndpoint(data) {
  return handleEndpoint({ method: "post", url: "/contact", data });
}

export async function placeAutocompleteEndpoint(data) {
  console.log(data);
  return handleEndpoint({
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
      process.env.REACT_APP_GOOGLE_API_KEY
    }&input=${data.input}&types=geocode`,
    auth: false,
  });
}

export async function reverseGeocodeEndpoint(data) {
  return handleEndpoint({ method: "post", url: "/reverse-geocode", data });
}
