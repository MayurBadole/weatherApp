// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchCity from './components/SearchCity';
import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchCity />} />
        <Route path="/weather-details/:location" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
