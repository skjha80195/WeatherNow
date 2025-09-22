import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found!");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({ ...weatherData.current_weather, name, country });
      setLoading(false);
    } catch (err) {
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-300 py-8 gap-y-10 px-4">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-black mt-6 tracking-wide text-transparent bg-clip-text bg-[linear-gradient(359deg,_#00c6ff,_#0072ff,_hsl(237.7,_84.96952027881206%,_50.18880327091623%))]">
        WEATHER APP
      </h1>

      {/* Search Bar */}
      <div className="flex mt-6 w-full max-w-[500px]">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-white w-full rounded-l-lg px-4 py-3 focus:outline-indigo-500 text-base sm:text-lg"
        />
        <button
          onClick={fetchWeather}
          className="bg-[linear-gradient(359deg,_#00c6ff,_#0072ff,_hsl(237.7,_84.96952027881206%,_50.18880327091623%))] text-white px-4 sm:px-6 py-2 font-extrabold rounded-r-full hover:scale-105 transition-transform"
        >
          SEARCH
        </button>
      </div>

      {/* Weather Card */}
      {(loading || error || weather) && (
        <div className="bg-white mt-6 rounded-xl shadow-lg p-6 w-full max-w-[500px] text-center">
          {loading && (
            <p className="text-slate-900 text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-slate-900 to-blue-500">
              Loading...
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {weather && (
            <>
              <div className="flex border-b pb-2 mb-6 justify-between">
                <div className="flex flex-col items-start">
                  <p className="font-bold text-lg sm:text-xl">
                    {weather.name}, {weather.country}
                  </p>
                  <p className="text-2xl sm:text-3xl">
                    {Math.floor(weather.temperature)}° C
                  </p>
                </div>
              </div>

              <div className="bg-pink-500 text-white font-bold grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl py-3 shadow-lg">
                <div>
                  <p>WIND</p>
                  <p className="font-normal text-black">
                    {weather.windspeed} km/h
                  </p>
                </div>
                <div>
                  <p>TEMPERATURE</p>
                  <p className="font-normal text-black">
                    {Math.floor(weather.temperature)}° C
                  </p>
                </div>
                <div>
                  <p>DIRECTION</p>
                  <p className="font-normal text-black">
                    {Math.floor(weather.winddirection)}°
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="bg-white drop-shadow-lg w-full py-3 rounded-lg fixed bottom-0 left-0 text-center">
        <h1 className="text-base sm:text-lg md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-black via-red-500 to-black">
          DEVELOPED BY : PRAJWAL KUMAR JHA
        </h1>
      </div>
    </div>
  );
};

export default WeatherApp;
