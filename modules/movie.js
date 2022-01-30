'use strict';
const axios = require('axios');
let cache = require('./cache.js');

module.exports = getMovies;

function getMovies(location) {
  const key = 'movies-' + location;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}&include_adult=false`;
  console.log('in movies');
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseMovie(response.data));
  }
  
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(movie => {
      return new Movies(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
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
