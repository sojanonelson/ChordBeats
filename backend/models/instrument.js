const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  soundFiles: {
    type: Map,
    of: String
  }
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = Instrument;
