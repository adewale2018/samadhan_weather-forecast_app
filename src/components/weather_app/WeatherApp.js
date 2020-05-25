import axios from "axios";
import React, { useState, useEffect } from "react";

import "./WeatherApp.css";
import SearchBar from "./../searchbar/SearchBar";

const WeatherApp = () => {
  const key1 = process.env.REACT_APP_KEY_1;
  const base1 = process.env.REACT_APP_BASE_1;
  const key2 = process.env.REACT_APP_KEY_2;
  const base2 = process.env.REACT_APP_BASE_2;
  const base3 = process.env.REACT_APP_BASE_3;

  const [timezone, setTimeZone] = useState("");
  const [current, setCurrent] = useState({});
  const [weather, setWeather] = useState([]);
  const [daily, setDaily] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [mapUrl, setMapUrl] = useState("");

  const requestMapQuestApi = async (city) => {
    setIsLoading(true);
    const res = await axios.get(`${base1}key=${key1}&location=${city}`);
    const { latLng, mapUrl } = res.data.results[0].locations[0];
    setIsLoading(false);
    return { latLng, mapUrl };
  };

  const requestOpenWeatherApi = async (lats, lngs) => {
    setIsLoading(true);
    let res = await axios.get(
      `${base2}lat=${lats}&lon=${lngs}&units=metric&appid=${key2}`
    );
    const { lat, lon, current, daily, timezone } = res.data;
    setIsLoading(false);
    return { lon, lat, current, daily, timezone };
  };

  const requestHistoricalData = async (lats, lngs, dt) => {
    setIsLoading(true);
    let i = 1;
    while (i < 6) {
      let prevTimeStamp = dt * 1000 - 86400000 * i;
      let res = await axios.get(
        `${base3}lat=${lats}&lon=${lngs}&dt=${prevTimeStamp}&appid=${key2}`
      );
      console.log("HISTORICAL", i, res.data);
      i++;
    }
    setIsLoading(false);
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
    setWeather(current.weather[0]);
    const { dt } = current;
    // requestHistoricalData(lat, lng, dt);
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

  const timeConverter = (dt) => new Date(dt * 1000);

  const { lat, lng } = coordinates;
  const { dt, temp, humidity, sunrise, sunset } = current;
  const { description, icon } = weather;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  if (isLoading) {
    return (
      <div>
        <h4 className='teal-text'>Loading...</h4>
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
        <div className='divider' />
        <div className='container center teal-text'>
          <h4 className='center'>{timezone.toUpperCase()}</h4>
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
                      <li className='collection-item'>
                        Sunrise: {timeConverter(sunrise).toLocaleTimeString()}
                      </li>
                      <li className='collection-item'>
                        Sunset: {timeConverter(sunset).toLocaleTimeString()}
                      </li>
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
            <div className='col s12 m9 center'>
              <h5 style={{ fontSize: "1.3rem", fontStyle: "italic" }}>
                {timeConverter(dt).toUTCString()}
              </h5>
              <div>
                <div className='col s12 m4'>
                  <h6>TEMPERATURE</h6>
                  <p className='card-panel card-panel-1'>{temp}&deg;C</p>
                </div>
                <div className='col s12 m4'>
                  <h6>HUMIDITY</h6>
                  <p className='card-panel card-panel-1'>{humidity}&#37;</p>
                </div>
                <div className='col s12 m4'>
                  <h6>WEATHER</h6>
                  <p className='card-panel'>
                    {description}
                    <img
                      src={iconUrl}
                      alt={description}
                      className='weather-icon'
                    />
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <h4 className='center '>NEXT THREE DAYS</h4>
                {daily
                  .slice(1, 4)
                  .map(({ dt, rain, humidity, temp, weather }) => (
                    <div className='col s12 m4' key={dt}>
                      <h6>{timeConverter(dt).toLocaleDateString()}</h6>

                      <ul className='collection with-header'>
                        <li className='collection-item'>
                          Precipitation: {rain}mm
                        </li>
                        <li className='collection-item'>
                          Humidity: {humidity}&#37;
                        </li>
                        <li className='collection-header'>
                          <h6>TEMPERATURE</h6>
                          <ul className='collection'>
                            <li className='collection-item'>
                              Morning: {temp.morn}&deg;C
                            </li>
                            <li className='collection-item'>
                              Evening: {temp.eve}&deg;C
                            </li>
                            <li className='collection-item'>
                              Night: {temp.night}&deg;C
                            </li>
                          </ul>
                        </li>
                        <li className='collection-header'>
                          <h6>WEATHER</h6>
                          <ul className='collection'>
                            <li className='collection-item'>
                              {weather[0].description}
                            </li>
                            <li className='collection-item'>
                              <img
                                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                                alt={weather[0].description}
                              />
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherApp;
