export const fetchWeather = (lat, long) => {
  const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/';
  return fetch(`${BASE_URL}${lat},${long}?exclude=minutely,alerts,flags&extend=hourly`).then(res => {
    return res.json();
  }).then(res => {
    return res;
  }).catch(e => console.log(e))
};

export const getCurrentPosition = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    return new Promise.reject('geolocation is not available on this device');
  }
}
