const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const pg = require('pg');


//middleware
app.use(cors());
app.use(express.json());

//convert string to numbers
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
    return parseFloat(value);
});

//Routes

//create an occurence
app.post('/events', async (req, res) => {
    try {
        const { occasion , description, year, month, day, cancelled } = req.body;
        const newEvent = await pool.query(
            'INSERT INTO events (occasion , description, year, month, day, cancelled) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [occasion , description, year, month, day, cancelled], 
        );
        res.json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all occurences
app.get('/events', async (req, res) => {
    try {
        const allEvents = await pool.query('SELECT * FROM events');
        res.json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one occurence
app.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const events = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        res.json(events.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update one occurence
app.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { occasion , description, year, month, day, cancelled} = req.body;
        const updateEvent = await pool.query(
            'UPDATE events SET occasion = $1, description = $2, year = $3, month = $4, day = $5 cancelled = $6, WHERE id = $7',
            [occasion , description, year, month, day, cancelled, id]
        );
        res.json('Event Updated');
    } catch (err) {
        console.error(err.message);
    }
})

//delete one occurence
app.delete('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteEvent = await pool.query('DELETE FROM events WHERE id = $1', [id]);
        res.json('Event Deleted');
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5005, () => {
    console.log('Listening on port 5005');
})