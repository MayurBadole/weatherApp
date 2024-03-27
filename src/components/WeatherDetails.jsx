// WeatherDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WeatherDetails.css";
import { GoArrowLeft } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import d2Img from "../Assets/02d@2x.png";
import snowImg from "../Assets/13d@2x.png";
import rainImg from "../Assets/10d@2x.png";
import thunderstormImg from "../Assets/11d@2x.png";
import mistImg from "../Assets/50n@2x.png";
import showerrainImg from "../Assets/09d@2x.png";
import brokencloudsImg from "../Assets/04d@2x.png";
import scatteredcloudsImg from "../Assets/03d@2x.png";
import waterDropImg from "../Assets/water-drop.png";
import temperatureImg from "../Assets/temperature.png";

function WeatherDetails() {
  const navigate = useNavigate();
  const { location } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "a33e91d18dfd74cea9a5fd0c175b0f5a";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeather();
  }, [location]);

  const handlePrevious = () => {
    navigate(-1);
  };
  if (!weatherData) {
    return <div className="loader"></div>;
  }
  if (weatherData?.cod === "404") {
    return (
      <div className="pageNotFOund">
        <div className="dataNotFound">No Data Found </div>
        <div> please enter valid location</div>
        <button className="goBackButton" onClick={handlePrevious}>
          Go Back Home
        </button>
      </div>
    );
  }
 
  let weatherIcon;
  switch (weatherData.weather[0]?.icon) {
    case "01d":
      weatherIcon = clearImg;
      break;
    case "01n":
      weatherIcon = clearImg;
      break;
    case "02d":
      weatherIcon = d2Img;
      break;
    case "02n":
      weatherIcon = d2Img;
      break;
    case "03d":
      weatherIcon = scatteredcloudsImg;
      break;
    case "03n":
      weatherIcon = scatteredcloudsImg;
      break;
    case "04d":
      weatherIcon = brokencloudsImg;
      break;
    case "04n":
      weatherIcon = brokencloudsImg;
      break;
    case "50n":
      weatherIcon = mistImg;
      break;
    case "50d":
      weatherIcon = mistImg;
      break;
    case "13n":
      weatherIcon = snowImg;
      break;
    case "13d":
      weatherIcon = snowImg;
      break;
    case "11n":
      weatherIcon = thunderstormImg;
      break;
    case "11d":
      weatherIcon = thunderstormImg;
      break;
    case "10n":
      weatherIcon = rainImg;
      break;
    case "10d":
      weatherIcon = rainImg;
      break;
    case "09n":
      weatherIcon = showerrainImg;
      break;
    case "09d":
      weatherIcon = showerrainImg;
      break;

    default:
      weatherIcon = clearImg;
  }
  
  return (
    <div className="container">
      <div className="details-cards">
        <span> </span>
        <div className="weather-app">
          <div className="prevButton" onClick={handlePrevious}>
            <GoArrowLeft />
          </div>
          <p className="name-app"> Weather App</p>
        </div>
        <img className="weather-img" src={weatherIcon} alt="img" />
        <p className="weather-degree">{weatherData?.main?.temp}°C</p>
        <p className="weather-description">
          {weatherData?.weather[0]?.description}
        </p>
        <p className="city-name">
          <div className="location-icon">
            <CiLocationOn />
          </div>
          {`${weatherData?.name} , ${weatherData?.sys?.country}`}
        </p>
        <div className="footer-card">
          <div className="temp" id="left-box">
            <img className="temp-icon" src={temperatureImg} alt="img" />
            <div className="temp-details">
              <p className="tempPer">{weatherData?.main?.feels_like}°C</p>
              <p className="temp-name">Feels like</p>{" "}
            </div>
          </div>
          <div className="humidity temp" id="right-box">
            <img className="water-drop" src={waterDropImg} alt="img" />
            <div className="huminity-details">
              <p className="huminityPer">{weatherData?.main?.humidity}%</p>
              <p className="huminity-name">Humidity</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
