'use strict';

console.log('hello people');

const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3002;

let cors = require('cors');

app.use(cors());


const axios = require('axios');

const getWeather = require('./weather');
const getMovies = require('./movies');

app.get('/weather', getWeather);

app.get('/movies', getMovies);





app.listen(PORT, () => console.log(`listening on port ${PORT}`));
