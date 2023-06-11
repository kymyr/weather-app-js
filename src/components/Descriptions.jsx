import React from 'react';
import moment from 'moment/moment';
import {BsSunriseFill, BsSunsetFill} from 'react-icons/bs';
import {FaTemperatureLow, FaTemperatureHigh, FaThermometerHalf} from 'react-icons/fa';
import {WiHumidity} from 'react-icons/wi';
import './descriptions.scss'

const Descriptions = ({ weather, units }) => {
    const tempUnit = units === "metric" ? "°C" : "°F";
  
    const cards = [
      {
        id: 1,
        icon: <FaTemperatureLow />,
        title: "min",
        data: weather.temp_min.toFixed(),
        unit: tempUnit,
      },
      {
        id: 2,
        icon: <FaTemperatureHigh />,
        title: "max",
        data: weather.temp_max.toFixed(),
        unit: tempUnit,
      },
      {
        id: 3,
        icon: <FaThermometerHalf />,
        title: "feels like",
        data: weather.feels_like.toFixed(),
        unit: tempUnit,
      },
      {
        id: 4,
        icon: <BsSunriseFill />,
        title: "sunrise",
        data: moment.utc(weather.sunrise,'X').add(weather.timezone,'seconds').format('LT'),
        unit: '',
      },
      {
        id: 5,
        icon: <BsSunsetFill />,
        title: "sunset",
        data: moment.utc(weather.sunset,'X').add(weather.timezone,'seconds').format('LT'),
        unit: '',
      },
      {
        id: 6,
        icon: <WiHumidity />,
        title: "humidity",
        data: weather.humidity,
        unit: "%",
      },
    ];

    return (
      <div className="section section__descriptions">
        {cards.map(({ id, icon, title, data, unit }) => (
          <div key={id} className="card">
            <div className="description__card-icon">
              {icon}
              <small>{title}</small>
            </div>
            <h2>{`${data} ${unit}`}</h2>
          </div>
        ))}
      </div>
    );
  };

export default Descriptions