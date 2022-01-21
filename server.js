'use strict';

console.log('hello people');

const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3002;

let cors = require('cors');

app.use(cors());

// const weatherData = require('./data/weather.json');
const axios = require('axios');




app.get('/weather', async (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  console.log(lat, lon);
  // console.log(weatherData);
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5&lan=en&units=I`
  // let filteredCity = (weatherData.filter(cityWeather => cityWeather.city_name === searchQuery));
  console.log(url)
  try {
    const weatherResults = await axios.get(url)
    
    let groomedWeather = weatherResults.data.data.map(day => new Forecast(day));
    console.log(groomedWeather);
    response.send(groomedWeather);
  } catch (error){
    response.status(404).send('pick another city')
  }
  // console.log(city);

});

class Forecast {
  constructor(day){

    this.description = day.weather.description;
    this.date = day.valid_date;
    this.max_temp = day.max_temp;
    this.min_temp = day.min_temp;
    

  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
