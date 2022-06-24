import axios from 'axios';
const BASE_URL = 'https://api.lysande.pepintrie.fr';

export default axios.create({
  baseURL: BASE_URL,
});

