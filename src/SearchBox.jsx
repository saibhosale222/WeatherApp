import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./SearchBox.css";

export default function SearchBox() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "https://api.weatherapi.com/v1/current.json";
  const API_KEY = "6c3857b7f0ff45bfa05172338262704";

  const getWeatherInfo = async (cityName) => {
    const response = await fetch(
      `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(cityName)}`
    );
    const jsonData = await response.json();

    if (!response.ok || jsonData.error) {
      throw new Error(jsonData.error?.message || "Unable to find weather data.");
    }

    return {
      city: jsonData.location.name,
      country: jsonData.location.country,
      temp: jsonData.current.temp_c,
      humidity: jsonData.current.humidity,
      feelsLike: jsonData.current.feelslike_c,
      condition: jsonData.current.condition.text,
      icon: jsonData.current.condition.icon,
    };
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cityName = city.trim();

    if (!cityName) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const weatherInfo = await getWeatherInfo(cityName);
      setWeather(weatherInfo);
      setCity("");
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="Search-box">
      <h2>Search for weather</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </section>
  );
}
