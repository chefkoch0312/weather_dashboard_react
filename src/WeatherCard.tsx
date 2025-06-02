// WeatherCard.tsx – Anzeige aktuelles Wetter
import React from "react";

interface Props {
  data: {
    temp_C: string;
    FeelsLikeC: string;
    weatherDesc: { value: string }[];
    humidity: string;
    pressure: string;
    windspeedKmph: string;
  };
}

const WeatherCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="card">
      <h2>Aktuelles Wetter</h2>
      <p>
        <strong>Temperatur:</strong> {data.temp_C}°C
      </p>
      <p>
        <strong>Gefühlt:</strong> {data.FeelsLikeC}°C
      </p>
      <p>
        <strong>Zustand:</strong> {data.weatherDesc[0].value}
      </p>
      <p>
        <strong>Luftfeuchtigkeit:</strong> {data.humidity}%
      </p>
      <p>
        <strong>Druck:</strong> {data.pressure} hPa
      </p>
      <p>
        <strong>Wind:</strong>{" "}
        {(parseFloat(data.windspeedKmph) / 3.6).toFixed(1)} m/s
      </p>
    </div>
  );
};

export default WeatherCard;
