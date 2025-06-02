// App.tsx – Hauptkomponente
import React from "react";
import WeatherDashboard from "./WeatherDashboard";

function App() {
  return (
    <div className="app-container">
      <h1>Wetter Dashboard</h1>
      <WeatherDashboard />
    </div>
  );
}

export default App;
