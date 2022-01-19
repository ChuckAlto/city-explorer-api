'use strict';

console.log('hello people');

const express = require('express');

const app = express();

const PORT = 3002

const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('hello, from our server');
})

app.get('/throw-an-error', (request, response) => {

  throw 'you not good!'
})


app.get('/weather', (request, response) => {
  let city_name = request.query.city_name;
  console.log(city_name);
  response.send(weatherData.filter(weather => weather.city_name === city_name).map(weather => new Weather(weather)));
});







app.get('*', (request, response) => {
  response.status(404).send('this is not a place.')
})


class Weather {
  constructor(weather){
    this.city_name=weather.city_name;
    this.lat=weather.lat;
    this.lon=weather.lon;
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
