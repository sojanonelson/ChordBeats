require('dotenv').config();

const mongoose = require('mongoose');

const keys = require('../config/keys');
const Instrument = require('../models/instrument');
const { database } = keys;



const instrumentsData = [
    {
      name: 'piano',
      soundFiles: {
        'C1': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'D1': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'E1': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'F1': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'G1': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'A1': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'B1': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'C2': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'D2': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'E3': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'F2': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'G2': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'A2': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'B2': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'C3': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'D3': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',
        'E3': 'https://github.com/sojanonelson/Web-look/raw/main/si-80238.mp3',

       
      }
    },
    // Add data for other instruments
  ];
  
  async function insertInstruments() {
    try {
      await Instrument.insertMany(instrumentsData);
      console.log('Instruments data inserted successfully');
    } catch (error) {
      console.error('Error inserting instruments data:', error);
    } finally {
      mongoose.disconnect();
    }
  }



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


