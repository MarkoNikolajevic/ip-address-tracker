// select items
const api =
  'https://geo.ipify.org/api/v1?apiKey=at_ZKpjRKaiY2e4DwDzkuMZHpEjp03iG';
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');
const ipUser = document.querySelector('#ip');
const locationUser = document.querySelector('#location');
const timezoneUser = document.querySelector('#timezone');
const ispUser = document.querySelector('#isp');
const markerIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconAnchor: [22, 94],
});
let lat = 51.505;
let lng = -0.09;

// map
const ipMap = L.map('ip-map').setView([lat, lng], 13);
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

// check ip or domain
const checkRequest = () => {
  const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm;
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:.[a-zA-Z]{2,})+$/;

  if (searchInput.value && ipRegex.test(searchInput.value)) {
    return {
      type: 'ip',
      value: searchInput.value,
    };
  } else if (searchInput.value && domainRegex.test(searchInput.value)) {
    return {
      type: 'domain',
      value: searchInput.value,
    };
  }
  // return user's ip by default
  return {
    type: 'ip',
    value: '',
  };
};

// get ip
async function getUserIp() {
  let options = checkRequest();
  let req = await fetch(`${api}&${options.type}=${options.value}`);
  let data = await req.json();
  searchInput.value = '';
  ipUser.innerHTML = data.ip;
  locationUser.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezoneUser.innerHTML = `UTC ${data.location.timezone}`;
  ispUser.innerHTML = data.isp;
  lat = data.location.lat;
  lng = data.location.lng;

  let marker = L.marker([lat, lng], { icon: markerIcon });
  ipMap.setView([lat, lng]);
  marker.addTo(ipMap);
}
// submit value from input
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getUserIp();
});

// submit on enter keypress
searchInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    getUserIp();
  }
});

getUserIp();
