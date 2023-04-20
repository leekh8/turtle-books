
const { Schema } = require('mongoose');


const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
      },
    email: { 
        type: String, 
        required: true 
      },
    address: { 
        type: String, 
        required: true 
      },
    phone: { 
        type: String, 
        required: true 
      },
    role: { 
      type : String,
      required : true,
      default: "User",
    },
    }
);

module.exports = UserSchema;