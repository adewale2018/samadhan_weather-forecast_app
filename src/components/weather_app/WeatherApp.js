import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";
import SearchBar from "./../searchbar/SearchBar";

const API = {
  key1: "d9qZXAtyE6yXTe0cDhfRF6s3PmImIuFR",
  base1: "https://www.mapquestapi.com/geocoding/v1/address?",
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
    console.log(res.data);
    const { lat, lon, current, daily, timezone } = await res.data;
    setIsLoading(false);
    return { lon, lat, current, daily, timezone };
  };

  const fetchData = async (city) => {
    const { mapUrl, latLng } = await requestMapQuestApi(city);
    const { lng, lat } = latLng;
    const { current, daily, timezone } = await requestOpenWeatherApi(lat, lng);
    setMapUrl(mapUrl);
    setCoordinates(latLng);
    setTimeZone(timezone);
    setCurrent(current);
    setDaily(daily);
  };

  const searchCity = (city) => {
    fetchData(city);
  };

  useEffect(() => {
    const initApp = () => {
      fetchData("Nairobi, Kenya");
    };
    initApp();
  }, []);

  const timeConverter = (dt) => new Date(dt * 1000).toUTCString();

  const { lat, lng } = coordinates;
  const { dt, temp, humidity } = current;

  if (isLoading) {
    return (
      <div>
        <h4 className="teal-text">Loading...</h4>
        <div className='preloader-wrapper big active'>
          <div className='spinner-layer spinner-blue-only'>
            <div className='circle-clipper left'>
              <div className='circle'></div>
            </div>
            <div className='gap-patch'>
              <div className='circle'></div>
            </div>
            <div className='circle-clipper right'>
              <div className='circle'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SearchBar searchCity={searchCity} />
      <section>
        <div className='divider'></div>
        <div className='container center teal-text'>
          <h4 className='center'>{timezone.toUpperCase()}</h4>
          <span style={{fontSize: '1.3rem', fontStyle: "italic"}}>{timeConverter(dt)}</span>
          <div className='row center'>
            <div className='col s12 m3 center'>
              <div className='card'>
                <div className='card-image waves-effect waves-block waves-light'>
                  <img
                    className='activator'
                    src={mapUrl}
                    alt={`Map showing ${timezone}`}
                  />
                </div>
                <div className='card-content'>
                  <span className='card-title activator grey-text text-darken-4'>
                    <ul className='collection'>
                      <li className='collection-item'>Latitude: {lat}</li>
                      <li className='collection-item'>Longitude: {lng}</li>
                    </ul>
                  </span>
                </div>
                <div className='card-reveal'>
                  <span className='card-title grey-text text-darken-4'>
                    <i className='material-icons right'>close</i>
                    <h5>{timezone}</h5>
                    <ul className='collection'>
                      <li className='collection-item'>Latitude: {lat}</li>
                      <li className='collection-item'>Longitude: {lng}</li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
            <div className='col s12 m9 center'></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherApp;
