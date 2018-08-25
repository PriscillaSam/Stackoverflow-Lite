import pool from '../../config/db.config';
import seedUser from './user';
import seedQuestion from './question';
import seedAnswer from './answer';

const seedQuery = `${seedUser}; ${seedQuestion}; ${seedAnswer} `;


(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(seedQuery);
  } finally {
    client.release();
    pool.end();
  }
})().catch(e => console.log(e.stack));
