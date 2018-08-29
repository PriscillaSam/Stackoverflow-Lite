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
DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions(id SERIAL PRIMARY KEY, 
question TEXT NOT NULL, 
createdat TIMESTAMP NOT NULL DEFAULT NOW(), 
updatedat TIMESTAMP NOT NULL DEFAULT NOW(), 
userId INTEGER REFERENCES users(id) ON DELETE CASCADE);
`;

const answerQUery = `
DROP TABLE IF EXISTS answers CASCADE; 
CREATE TABLE answers(id SERIAL PRIMARY KEY, 
answer TEXT NOT NULL, 
isaccepted BOOLEAN NOT NULL, 
createdat TIMESTAMP NOT NULL DEFAULT NOW(), 
updatedat TIMESTAMP NOT NULL DEFAULT NOW() , 
questionId INTEGER REFERENCES questions(id) ON DELETE CASCADE, 
userId INTEGER REFERENCES users(id) ON DELETE CASCADE);
`;

const voteQuery = `
DROP TABLE IF EXISTS votes; 
CREATE TABLE votes(id SERIAL PRIMARY KEY, 
votestatus INTEGER NOT NULL, 
createdat TIMESTAMP NOT NULL DEFAULT NOW(), 
updatedat TIMESTAMP NOT NULL DEFAULT NOW(), 
userId INTEGER REFERENCES users(id) ON DELETE CASCADE, 
answerId INTEGER REFERENCES answers(id) ON DELETE CASCADE);
`;

const query = `${userQuery} ${questionQuery} ${answerQUery} ${voteQuery}`;

(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(query);
  } finally {
    client.release();
    pool.end();
  }
})().catch(e => console.log(e.stack));
