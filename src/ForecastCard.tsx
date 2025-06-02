// ForecastCard.tsx – Anzeige Wettervorhersage
import React from "react";

interface ForecastItem {
  date: string;
  time: string;
  tempC: string;
  weatherDesc: { value: string }[];
}

interface Props {
  items: ForecastItem[];
}

const ForecastCard: React.FC<Props> = ({ items }) => {
  return (
    <div className="card">
      <h2>Wettervorhersage</h2>
      {items.map((item, idx) => {
        const time = `${item.time.slice(0, 2)}:${item.time.slice(2)}`;
        return (
          <div key={idx} className="forecast-block">
            <strong>
              {item.date} {time}
            </strong>
            : {item.tempC}°C, {item.weatherDesc[0].value}
          </div>
        );
      })}
    </div>
  );
};

export default ForecastCard;
