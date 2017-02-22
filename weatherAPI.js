const rootUrl = 'http://samples.openweathermap.org/data/2.5/weather?appid=e49a6cbe149a8c7a1c9ab203ca9ab794';

export const fetchWeather = (lat, lon) => {
  const url = rootUrl+'&lat='+lat+'&lon='+lon;

  return fetch(url)
    .then(res => res.json())
    .then(json => ({
      temp: json.main.temp,
      weather: json.weather[0].main
    }))
}
