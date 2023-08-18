const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//Routes

//create an occurence
app.post('/agenda', async (req, res) => {
    try {
        const { text, eventstart, eventend, color, hourstart, hourend } = req.body;
        const newTitle = await pool.query(
            'INSERT INTO agenda (text, eventstart, eventend, hourstart, hourend, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [text, eventstart, eventend, color, hourstart, hourend]
        );
        res.json(newTitle.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all occurences
app.get('/agenda', async (req, res) => {
    try {
        const allagendas = await pool.query('SELECT * FROM agenda');
        res.json(allagendas.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one occurence
app.get('/agenda/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const agenda = await pool.query('SELECT * FROM agenda WHERE id = $1', [id]);
        res.json(agenda.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update one occurence
app.put('/agenda/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text, eventstart, eventend, color, hourstart, hourend } = req.body;
        const updateAgenda = await pool.query(
            'UPDATE agenda SET titre = $1, eventstart = $2, eventend = $3, color = $4, hourstart = $5, hourend = $6 WHERE id = $7',
            [text , eventstart, eventend, color, hourstart, hourend, id]
        );
        res.json('Agenda Updated');
    } catch (err) {
        console.error(err.message);
    }
})

//delete one occurence
app.delete('/agenda/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAgenda = await pool.query('DELETE FROM agenda WHERE id = $1', [id]);
        res.json('Agenda Deleted');
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5005, () => {
    console.log('Listening on port 5005');
})