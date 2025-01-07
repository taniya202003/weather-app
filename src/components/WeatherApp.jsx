import React, { useState, useEffect } from "react";
import "../styles.css";
import axios from "axios";
import { SearchEngine } from "./SearchEngine";
import { Forecast } from "./Forecast";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  console.log(query,"query")
  console.log(recentSearches,"recentSearches")
  console.log(weather,"weather")

  const updateRecentSearches = (city) => {
    setRecentSearches((prevSearches) => {
      // Remove the city if it already exists
      const filteredSearches = prevSearches.filter((search) => search !== city);

      // Add the city to the front
      const updatedSearches = [city, ...filteredSearches.slice(0, 4)]; //  5 recent searches
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  const search = async (event) => {
    event.preventDefault();
    if (
      event.type === "click" ||
      (event.type === "keypress" && event.key === "Enter")
    ) {
      setWeather({ ...weather, loading: true });

      // Set default query if the input is empty
      const searchQuery = query.trim() === "" ? "Chandigarh" : query;

      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`;

      try {
        const res = await axios.get(url);
        if (res.data) {
          setWeather({ data: res.data, loading: false, error: false });
          updateRecentSearches(searchQuery); // Update recent searches
        } else {
          // Handle the case where the response doesn't have expected data
          setWeather({ data: {}, loading: false, error: true });
        }
        setQuery("")
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.error("Error fetching weather data:", error);
      }
    }
  };

  useEffect(() => {
    // Fetch default weather data for Chandigarh on initial load
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Chandigarh&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.error("Error fetching default weather data:", error);
      }
    };

    // Load recent searches from local storage
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);

    fetchData();
  }, []);

  return (
    <div>
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && <h4>Searching...</h4>}

      {weather.error && (
        <span className="error-message">
          Sorry, city not found. Please try again.
        </span>
      )}

      {weather.data.main && <Forecast weather={weather}  />}

      {/* Display recent searches */}
      {recentSearches.length > 0 && (
        <div className="forecast">
          <h3>Recent Searches:</h3>
          <div className="forecast-container">
            {recentSearches.map((city, index) => (
              <div className="day" key={index}>
                <p className="day-name">{city}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
