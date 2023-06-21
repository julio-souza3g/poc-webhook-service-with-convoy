// import { Convoy } from 'convoy.js';
import axios from 'axios';

const convoy = axios.create({
  baseURL: process.env.CONVOY_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.CONVOY_API_KEY}`,
  },
});

/* const convoy = new Convoy({
  api_key: process.env.CONVOY_API_KEY as string,
  project_id: process.env.CONVOY_PROJECT_ID as string,
  uri: 'http://localhost:5005',
}); */

export default convoy;