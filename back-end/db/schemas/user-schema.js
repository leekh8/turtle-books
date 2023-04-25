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
userRole:  사용자 권한
*/
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // 중복 허용 안함
      unique: 1,
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
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
    userRole: {
      type: String,
      required: false,
      default: "basic-user",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
const userSchema = model("User", UserSchema);

module.exports = userSchema;
