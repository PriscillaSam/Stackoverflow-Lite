import pg from 'pg';
import dotenv from 'dotenv';
import config from './config';

dotenv.config();
const { Pool } = pg;

const env = process.env.NODE_ENV || 'development';
const configInfo = config[env];


export default new Pool(configInfo);
