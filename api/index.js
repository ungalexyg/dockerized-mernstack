import express from 'express';
import DBClient from './mongo-client.js';
import cors from 'cors';

const mdb = new DBClient();
const app = express();
const PORT = 4000;
const results = await mdb.findUsers();
console.log("index results", results);

// make the api public 
app.use(cors({ origin: '*' }));

// demo get url
app.get('/', async (req, res) => {
    res.json(results);
});

// serve on 4000
app.listen(PORT, () => {
    console.log('Your server is running on PORT:', PORT);
});

