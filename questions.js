const { Pool } =  require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
		rejectUnauthorized: false
	}
});

const getAll = async () => {
    const client = await pool.connect();
    const results = await client.query('SELECT question_id, prompt, response_type FROM "question"');

    return results.rows.map(element => ({
        questionId: element.question_id,
        prompt: element.prompt,
        responseType: element.response_type,
    }));
}

exports.getAll = getAll;