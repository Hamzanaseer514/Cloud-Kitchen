const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Yeh 'User' model ko reference karega
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  license: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Rider', RiderSchema);
