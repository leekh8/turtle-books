const { Schema } = require("mongoose");
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "categorys",
  }
);

module.exports = categorySchema;
