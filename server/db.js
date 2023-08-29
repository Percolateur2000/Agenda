const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
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
    CREATE TABLE IF NOT EXISTS "events" (
	    "id" SERIAL,
	    "occasion" VARCHAR(36),
	    "description" VARCHAR(72),
	    "year" numeric(4),
	    "month" numeric(2),
        "day" numeric(2),
        "cancelled" BOOLEAN,
	    PRIMARY KEY ("id")
    );`;

execute(text);

module.exports = pool