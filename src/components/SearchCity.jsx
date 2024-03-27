// Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCityName } from "../utils";
import "./SearchCity.css";

function SearchCity() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
const [error , setError]=useState()
 
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = "a33e91d18dfd74cea9a5fd0c175b0f5a";
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`);
            const data = await response.json();
            if (data && data.length > 0) {
              navigate(`/weather-details/${encodeURIComponent(data[0].name)}`);
            } else {
                setError('City not found');
            }
          } catch (error) {
            console.error('Error fetching city:', error);
            setError('Error fetching city');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Error getting location');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      setError('Geolocation is not supported');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/weather-details/${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="container">
      <div className="cards">
        <div className="app-name">Weather App</div>
         
        <form onSubmit={handleSubmit} className="form-box">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            className="input-box"
            required
          />

          <div className="or-feild btn border">or</div>
          <button className="location-button" type="button" onClick={handleGetLocation}>
            <div className="location-title"> Get Device Location </div>
          </button>
          {error}
        </form>
      </div>
    </div>
  );
}

export default SearchCity;
