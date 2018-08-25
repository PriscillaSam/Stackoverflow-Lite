import pool from '../../config/db.config';
import seedUser from './user';
import seedQuestion from './question';

const seedQuery = `${seedUser}; ${seedQuestion} `;


(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(seedQuery);
  } finally {
    client.release();
    pool.end();
  }
})().catch(e => console.log(e.stack));
