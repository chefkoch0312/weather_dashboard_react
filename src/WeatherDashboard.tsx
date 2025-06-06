// WeatherDashboard.tsx – zentrale Logik
import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

interface WeatherData {
  temp_C: string;
  FeelsLikeC: string;
  weatherDesc: { value: string }[];
  humidity: string;
  pressure: string;
  windspeedKmph: string;
}

interface ForecastData {
  date: string;
  time: string;
  tempC: string;
  weatherDesc: { value: string }[];
}

function WeatherDashboard() {
  const [city, setCity] = useState("Berlin");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [log, setLog] = useState<string[]>([]);

  const logMessage = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  const fetchWeather = async () => {
    logMessage(`Hole Wetterdaten für ${city}...`);
    try {
      const res = await fetch(
        `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
        }
      );
      const data = await res.json();
      setWeather(data.current_condition[0]);

      const allForecasts: ForecastData[] = [];
      data.weather.slice(0, 2).forEach((day: any) => {
        day.hourly.forEach((hour: any) => {
          allForecasts.push({
            date: day.date,
            time: hour.time.padStart(4, "0"),
            tempC: hour.tempC,
            weatherDesc: hour.weatherDesc,
          });
        });
      });
      setForecast(allForecasts);
      logMessage("✓ Wetterdaten erfolgreich geladen");
    } catch (err) {
      logMessage(`✗ Fehler: ${err}`);
    }
  };

  const runConnectionTest = async () => {
    logMessage("=== Verbindungstest gestartet ===");

    try {
      const httpbin = await fetch("https://httpbin.org/get");
      logMessage(`✓ Internetverbindung OK (Status: ${httpbin.status})`);
    } catch (err) {
      logMessage(`✗ Internetverbindung fehlgeschlagen: ${err}`);
    }

    try {
      const temp = await fetch(
        `https://wttr.in/${encodeURIComponent(city)}?format=%t`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
        }
      );
      const txt = await temp.text();
      logMessage(`✓ wttr.in Antwort: ${txt.trim()}`);
    } catch (err) {
      logMessage(`✗ wttr.in Fehler: ${err}`);
    }

    try {
      const json = await fetch(
        `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
        }
      );
      const data = await json.json();
      logMessage(`✓ JSON-API funktioniert`);
      logMessage(`Aktuelle Temperatur: ${data.current_condition[0].temp_C}°C`);
    } catch (err) {
      logMessage(`✗ JSON API Fehler: ${err}`);
    }

    logMessage("=== Test abgeschlossen ===");
  };

  useEffect(() => {
    setTimeout(fetchWeather, 2000);
  }, []);

  return (
    <div>
      <div className="location-input">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Aktualisieren</button>
        <button onClick={runConnectionTest}>Test Verbindung</button>
      </div>

      {weather && <WeatherCard data={weather} />}
      {forecast.length > 0 && <ForecastCard items={forecast} />}

      <div className="debug">
        <h2>Debug-Informationen</h2>
        <pre>{log.join("\n")}</pre>
      </div>
    </div>
  );
}

export default WeatherDashboard;
