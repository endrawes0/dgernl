const { Pool } =  require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
		rejectUnauthorized: false
	}
});

const lookupByName = async (userName) => {
    const client = await pool.connect();
    const results = await client.query('SELECT user_id, user_name FROM "user" WHERE user_name = $1', [userName])
    const result = results.rows.length ? results.rows[0] : undefined;
    client.release();

    if(result){
        return {
            userId: result.user_id,
            userName: result.user_name
        };
    }
}

const lookupById = async (userId) => {
    const client = await pool.connect();
    const results = await client.query('SELECT user_id, user_name FROM "user" WHERE user_id = $1', [userId])
    const result = results.rows.length ? results.rows[0] : undefined;
    client.release();

    if(result){
        return {
            userId: result.user_id,
            userName: result.user_name
        };
    }
}

const create = async (userName) => {
    const client = await pool.connect();
    await client.query('INSERT INTO "user" (user_name) VALUES ($1)', [userName]);
    return lookupByName(userName);
}

const getAllUsers = async () => {
    const client = await pool.connect();
    const results = await client.query('SELECT user_id, user_name FROM "user"');

    return results.rows.map(element => ({
        userId: element.user_id,
        userName: element.user_name,
    }));
}

exports.lookupByName = lookupByName;
exports.lookupById = lookupByName;
exports.create = create
exports.getAllUsers = getAllUsers;