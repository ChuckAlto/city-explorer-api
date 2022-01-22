'use strict'

const axios = require('axios');

class Movies {
  constructor(movie){
    this.title = movie.original_title;
    this.poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    this.overview = movie.overview;
    this.release = movie.release_date;
    console.log('https://image.tmdb.org/t/p/w500' + movie.poster_path);
  }
}

async function getMovies (request, response){
  let location = request.query.location;


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
}


module.exports = getMovies;
