require('dotenv').config();

const mongoose = require('mongoose');

const keys = require('../config/keys');
const Instrument = require('../models/instrument');
const { database } = keys;







const setupDB = async () => {
    try {
        console.log('Connecting to MongoDB...')
        await mongoose.connect(database.url);
        // insertInstruments()
        console.log('✓ MongoDB Connected!');

    } catch (err) {
        console.log('MongoDB Connection Error:', err);
        
    }
};

module.exports = setupDB;


