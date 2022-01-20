'use strict';

console.log('hello people');

const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3002;

let cors = require('cors');

app.use(cors());

const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('hello, from this here server server');
})

app.get('/throw-an-error', (request, response) => {

  throw 'you not good!'
})


app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  console.log(searchQuery);
  let city = (weatherData.filter(cityWeather => cityWeather.city_name.toLowerCase() === searchQuery));
  try {
    let cityTwo = city[0].data.map(weather => new Forecast(weather));
    console.log(city);
    console.log(cityTwo);
    response.send(cityTwo);
  } catch (error){
      response.status(404).send('pick another city')
  }
});



 




class Forecast {
  constructor(weather){

    this.description = weather.weather.description;
    this.date = weather.valid_date;
    

  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
