import pg from 'pg';
import dotenv from 'dotenv';
import parseUrl from 'parse-database-url';

import config from './config';

dotenv.config();
const { Pool } = pg;
let configInfo;

if (process.env.NODE_ENV === 'production') {
  configInfo = parseUrl(process.env.DATABASE_URL);
} else {
  const env = process.env.NODE_ENV || 'development';
  configInfo = config[env];
}


export default new Pool(configInfo);
