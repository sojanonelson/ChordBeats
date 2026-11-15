require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes')
const cors = require('cors')
const setupDB = require("./utils/db")

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' })); 

setupDB()
app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/',(req,res)=>{
    res.send('ChordBeat server is running')
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`ChordBeat server is running on port ${PORT}`)
})