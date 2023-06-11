// API KEY obtained from: https://openweathermap.org/api
const API_KEY = "INPUT API KEY HERE";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWeatherDetails = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    sys: { country, sunrise, sunset },
    dt,
    timezone,
    name,
  } = data;

  const { main, id, description, icon } = weather[0];

  return {
    id,
    main,
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    country,
    sunrise, 
    sunset,
    dt,
    timezone,
    name,
  };
};

export { getWeatherDetails };