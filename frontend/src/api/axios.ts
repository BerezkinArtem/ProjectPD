import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_ENDPOINT || 'https://default-api-url.com',
});

export { axios, api };