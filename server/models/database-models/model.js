import pool from '../../config/db.config';

const userQuery = `
DROP TABLE IF EXISTS users CASCADE; 
CREATE TABLE users(id SERIAL PRIMARY KEY, 
name VARCHAR(40) NOT NULL, 
email VARCHAR NOT NULL, 
passHash VARCHAR, 
createdat TIMESTAMP NOT NULL DEFAULT NOW(), 
updatedat TIMESTAMP NOT NULL DEFAULT NOW());
`;

const questionQuery = `
DROP TABLE IF EXISTS questions;
CREATE TABLE questions(id SERIAL PRIMARY KEY, 
question TEXT NOT NULL, 
createdat TIMESTAMP NOT NULL DEFAULT NOW(), 
updatedat TIMESTAMP NOT NULL DEFAULT NOW(), 
userId INTEGER REFERENCES users(id) ON DELETE CASCADE);
`;

const query = `${userQuery} ${questionQuery}`;

(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(query);
  } finally {
    client.release();
    pool.end();
  }
})().catch(e => console.log(e.stack));
