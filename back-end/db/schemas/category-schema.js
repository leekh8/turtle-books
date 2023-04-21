
const { Schema }= require('mongoose');

const categorySchema = new Schema(
  {
      name: {
        type: String,
        require: true,
      },
  },
  {
    timestamps: true,
    collection: "category",
  }
);
module.exports = categorySchema;
