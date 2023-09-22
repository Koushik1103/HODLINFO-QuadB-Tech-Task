const mongoose = require("mongoose");

const schema_d = mongoose.Schema({
  base_unit: {
    type: String,
  },
  quote_unit: {
    type: String,
  },
  low: {
    type: Number,
  },
  high: {
    type: Number,
  },
  last: {
    type: Number,
  },
  type: {
    type: String,
  },
  open: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  sell: {
    type: Number,
  },
  buy: {
    type: Number,
  },
  at: {
    type: Number,
  },
  name: {
    type: String,
  },
});

const schema_data = mongoose.model("SchemaData", schema_d);

module.exports = schema_data;
