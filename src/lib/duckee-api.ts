import axios from 'axios';

export const duckeeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DUCKEE_ENDPOINT,
});
