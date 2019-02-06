'use strict';

const mongoose = require('mongoose');
const { PORT, DATABASE_URL } = require('./config');
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
require('dotenv').config();

const characterSchema = mongoose.Schema({
  name: { type: String, required: true },
  race: { type: String, required: true },
  class: { type: String, required: true },
  level: { type: Number, required: true },
  alignment: { type: String, required: true },
});

characterSchema.methods.serialize = function () {
  return {
    id: this._id,
    name: this.name,
    race: this.race,
    class: this.class,
    level: this.level,
    alignment: this.alignment
  };
};

const Character = mongoose.model('Character', characterSchema);

module.exports = { Character };