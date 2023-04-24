const Schema = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  }
);

module.exports = categorySchema;