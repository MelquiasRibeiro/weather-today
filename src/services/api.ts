import axios from 'axios';
import {apiKey} from '../../vars';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: apiKey,
    units: 'metric',
    lang: 'pt',
  },
});

export default api;
