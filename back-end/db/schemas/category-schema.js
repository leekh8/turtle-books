
const { Schema } = require('mongoose');
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    collation: "categories"
  }
);

module.exports = categorySchema;
