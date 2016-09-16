let kelvinToFahrenheit = (kelvin) => {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F';
}

module.exports = (latitude, longitude) => {
  const QUERY = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9747ce77c6665fbe2c6da02ade8e4c00`;

  console.log(QUERY);

  return fetch(QUERY)
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      return {
        city: weatherData.name,
        temperature: kelvinToFahrenheit(weatherData.main.temp),
        description: weatherData.weather[0].description
      };
    })
    .catch(err => console.log(err));
}