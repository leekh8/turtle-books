// user-model.js

// db 관련 로직
// db에서 데이터 저장, 조회, 수정, 삭제 가능한 메서드 제공
// default로 true 값을 가지는 withReturn 값 생성
// false 일 경우 return 안함

/*
--- user schema ---
userId:    사용자 id
password:  비밀번호
email:     이메일
fullName:  이름
address:   배송지
birthDate: 생년월일
role:  사용자 권한
*/

const mongoose = require("mongoose");
const UserSchema = require("../schemas/user-schema");

const User = mongoose.model("users", UserSchema);
class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email: email });

    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });

    return user;
  }

  async create(userInfo) {
    const user = await User.create(userInfo);
    return user;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async deleteById(userId) {
    const result = await User.deleteOne({ _id: userId });
    return result;
  }
}

const userModel = new UserModel();

module.exports = userModel;
