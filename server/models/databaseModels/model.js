import pool from '../../config/db.config';

const userQuery = `
DROP TABLE IF EXISTS users CASCADE; 
CREATE TABLE users(id SERIAL PRIMARY KEY, 
name VARCHAR(40) NOT NULL, 
email VARCHAR NOT NULL, 
password_hash VARCHAR, 
created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
updated_at TIMESTAMP NOT NULL DEFAULT NOW());
`;

const questionQuery = `
DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions(id SERIAL PRIMARY KEY, 
question TEXT NOT NULL, 
created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
updated_at TIMESTAMP NOT NULL DEFAULT NOW(), 
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
question_tokens TSVECTOR);
`;

const answerQUery = `
DROP TABLE IF EXISTS answers CASCADE; 
CREATE TABLE answers(id SERIAL PRIMARY KEY, 
answer TEXT NOT NULL, 
is_accepted BOOLEAN NOT NULL, 
created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
updated_at TIMESTAMP NOT NULL DEFAULT NOW() , 
question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE, 
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE);
`;

const voteQuery = `
DROP TABLE IF EXISTS votes; 
CREATE TABLE votes(id SERIAL PRIMARY KEY, 
vote INTEGER NOT NULL, 
created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
updated_at TIMESTAMP NOT NULL DEFAULT NOW(), 
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE);
`;

const commentQuery = `
DROP TABLE IF EXISTS comments; 
CREATE TABLE comments(id SERIAL PRIMARY KEY, 
comment TEXT NOT NULL, 
created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
updated_at TIMESTAMP NOT NULL DEFAULT NOW(), 
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE);
`;

const query = `
  ${userQuery} 
  ${questionQuery} 
  ${answerQUery} 
  ${voteQuery} 
  ${commentQuery}
`;

(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(query);
  } finally {
    client.release();
    pool.end();
  }
})().catch(e => console.log(e.stack));
