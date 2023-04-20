import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      // space bar를 없애준다.
      trim: true,
      // 중복을 허용하지 않는다.
      unique: 1,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
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
    role: {
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

export { UserSchema };
