import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DB,
    password: process.env.DATABASE_PWD,
    port: process.env.DATABASE_PORT,
  },
  test: {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DB_TEST,
    password: process.env.DATABASE_PWD,
    port: process.env.DATABASE_PORT,
  },
  production: {
  },
  secret: process.env.JWT_SECRET,
};

export default config;
