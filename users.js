const { Pool } =  require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
		rejectUnauthorized: false
	}
});

const lookupByName = async (userName) => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "user" WHERE user_name = $1', [userName])
    const results = { 'results': (result) ? result.rows : null };
    client.release();

    return results.results.length > 0 ? results.results[0] : undefined;
}

const lookupById = async (userId) => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "user" WHERE user_id = $1', [userId])
    const results = { 'results': (result) ? result.rows : null };
    client.release();

    return results.results.length > 0 ? results.results[0] : undefined;
}

const create = async (userName) => {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO "user" (user_name) VALUES ($1)', [userName]);
    console.log(result);

    return result;
}

exports.lookupByName = lookupByName;
exports.lookupById = lookupByName;
exports.create = create