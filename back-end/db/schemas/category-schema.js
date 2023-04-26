<<<<<<< HEAD
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


=======

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
>>>>>>> 3437cec78674f8d05c30272b827dc9c1dcfcf073
