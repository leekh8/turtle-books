// user-schema.js
/*
--- user schema ---
userId:    사용자 id
password:  비밀번호
email:     이메일
lastName:  성
firstName: 이름
address:   배송지
birthDate: 생년월일
role:  사용자 권한
*/

const { Schema, mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
    birthDate: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
      enum: ["admin", "user"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = UserSchema;
