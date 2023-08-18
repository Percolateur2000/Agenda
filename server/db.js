const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    database: 'pern_agenda',
    password: 'loutre',
    port: 5432,
});

const execute = async (query) => {
    try {
        await pool.connect();
        await pool.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const text = `
    CREATE TABLE IF NOT EXISTS "agenda" (
	    "id" SERIAL,
	    "text" VARCHAR(255),
	    "eventstart" VARCHAR(255),
        "eventend" VARCHAR(255),
        "hourstart" VARCHAR(255),
	    "hourend" VARCHAR(255),
	    "color" VARCHAR(255),
	    PRIMARY KEY ("id")
    );`;

execute(text).then(result => {
    if (result) {
        console.log('Table created');
    }
});

module.exports = pool