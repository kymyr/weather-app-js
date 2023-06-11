import clear from './assets/clear.jpg';
import rainy from './assets/rainy.jpg';
import snowy from './assets/snowy.jpg';
import thunder from './assets/thunderstorm.jpg';
import cloudy from './assets/cloudy.jpg';
import drizzle from './assets/drizzle.jpg';
import mist from './assets/atmosphere.jpg';
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getWeatherDetails } from './weatherService';

function App() {
  const [city, setCity] = useState("Manila");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(cloudy);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherDetails(city, units);
      setWeather(data);

      // dynamic bg based on weather conditions
      // Source: https://openweathermap.org/weather-conditions
      if (data.main === "Clear") setBg(clear);
      else if (data.main === "Rain") setBg(rainy);
      else if (data.main === "Thunderstorm") setBg(thunder);
      else if (data.main === "Snow") setBg(snowy);
      else if (data.main === "Drizzle") setBg(drizzle);
      else if (data.main === "Clouds") setBg(cloudy);
      else setBg(mist);
    };

    fetchWeatherData();
  }, [units, city]);
  
  
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  
  
  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
