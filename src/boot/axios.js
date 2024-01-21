import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); 

const base = process.env.baseURL;
const api = axios.create({ baseURL: base });

export { api };
