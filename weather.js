'use strict'

const axios = require('axios');

let cache = {};


class Forecast {
  constructor(day){

    this.description = day.weather.description;
    this.date = day.valid_date;
    this.max_temp = day.max_temp;
    this.min_temp = day.min_temp;
  }
}


async function getWeather (request, response){
  let lat = request.query.lat;
  let lon = request.query.lon;
  let key= lon + 'day';
  if (cache[key] && Date.now() - cache[key].timestamp < (1000 * 10)){
    console.log('cache hit, whether for the win');
    response.send(cache[key].data);
  } else {
    console.log('cache miss, no weather today.')
  }



  let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5&lan=en&units=I`
  console.log(url)
  try {
    const weatherResults = await axios.get(url)
    
    let groomedWeather = weatherResults.data.data.map(day => new Forecast(day));
    console.log(groomedWeather);
    cache[key] = {
      data: groomedWeather,
      timestamp: Date.now(),
    };
    response.send(groomedWeather);
  } catch (error){
    response.status(404).send('pick another city')
  }
}


module.exports = getWeather;
