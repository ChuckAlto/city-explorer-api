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

const getWeather = require('./weather');
const getMovies = require('./movies');

// app.get('/weather', getWeather)

// app.get('/movies,', getMovies);



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

app.get('/movies', async (request, response) => {
  let location = request.query.location;
  console.log(location);
  
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}&include_adult=false`
  
  console.log(movieUrl)
  try {
    const movieResults = await axios.get(movieUrl)
    
    let groomedMovies = movieResults.data.results.map(movie => new Movies(movie));
    console.log(groomedMovies);
    response.send(groomedMovies);
  } catch (error){
    response.status(404).send('pick another movie')
  }
  

});

class Forecast {
  constructor(day){

    this.description = day.weather.description;
    this.date = day.valid_date;
    this.max_temp = day.max_temp;
    this.min_temp = day.min_temp;
  }
}

class Movies {
  constructor(movie){
    this.title = movie.original_title;
    this.poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    this.overview = movie.overview;
    this.release = movie.release_date;
    console.log('https://image.tmdb.org/t/p/w500' + movie.poster_path);
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
