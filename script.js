// select items
const url =
  'https://geo.ipify.org/api/v1?apiKey=at_ZKpjRKaiY2e4DwDzkuMZHpEjp03iG&ipAddress=8.8.8.8';
const ipUser = document.querySelector('#ip');
const locationUser = document.querySelector('#location');
const timezoneUser = document.querySelector('#timezone');
const ispUser = document.querySelector('#isp');
const markerIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconAnchor: [22, 94],
});

// map
const ipMap = L.map('ip-map').setView([51.505, -0.09], 13);
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    zoomControl: false,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoibWFya2V6ODkiLCJhIjoiY2tlcHQxYXZmMWd0YzJ2bzhhcmM0Ymk1MiJ9.dwZ16-UaTVk-3dFSPahVZA',
  }
).addTo(ipMap);

const marker = L.marker([51.5, -0.09], { icon: markerIcon }).addTo(ipMap);

fetch(url).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
    ipUser.innerHTML = data.ip;
    locationUser.innerHTML = data.location.city;
    timezoneUser.innerHTML = data.location.timezone;
    ispUser.innerHTML = data.isp;
  });
});
