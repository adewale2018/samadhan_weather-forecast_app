import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";
import SearchBar from "./../searchbar/SearchBar";

const API = {
  key1: "d9qZXAtyE6yXTe0cDhfRF6s3PmImIuFR",
  base1: "http://www.mapquestapi.com/geocoding/v1/address?",
  key2: "286562a1959f4ea27c042b585488bcf6",
  base2: "https://api.openweathermap.org/data/2.5/onecall?",
};

const WeatherApp = () => {
  const [timezone, setTimeZone] = useState("");
  const [current, setCurrent] = useState({});
  const [city, setCity] = useState("");
  const [daily, setDaily] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [mapUrl, setMapUrl] = useState("");

  const requestMapQuestApi = async (city) => {
    let res = await axios.get(`${API.base1}key=${API.key1}&location=${city}`);
    const { latLng, mapUrl } = await res.data.results[0].locations[0];
    setIsLoading(false);
    return { latLng, mapUrl };
  };

  const requestOpenWeatherApi = async (lats, lngs) => {
    setIsLoading(true);
    let res = await axios.get(
      `${API.base2}lat=${lats}&lon=${lngs}&units=metric&exclude=hourly&appid=${API.key2}`
    );
    const { lat, lon, current, daily, timezone } = await res.data;
    setIsLoading(false);
    return { lon, lat, current, daily, timezone };
  };
  

  if (isLoading) {
    return <h1>LOADING DATA...</h1>;
  }
  return (
    <div>
      <SearchBar />
      <section>
        <h3>Data Here</h3>
        <button onClick={() => requestOpenWeatherApi(6.5, 3.4)}>Click Me</button>
      </section>
    </div>
  );
};

export default WeatherApp;
