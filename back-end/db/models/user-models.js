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
lastName:  성
firstName: 이름
address:   배송지
birthDate: 생년월일
role:  사용자 권한
*/

const mongoose = require("mongoose");
const UserSchema = require("../schemas/user-schema");

const User = mongoose.model("User", UserSchema);
const withReturn = true;
class UserModel {
  async findByEmail(email, withReturn) {
    if (!withReturn) {
      await User.findOne({ email });
    }
    return User.findOne({ email });
  }

  async findById(userId, withReturn) {
    if (!withReturn) {
      await User.findOne({ _id: userId });
    }
    return User.findOne({ _id: userId });
  }

  async create(userInfo, withReturn) {
    if (!withReturn) {
      await User.create(userInfo);
    }
    return User.create(userInfo);
  }

  async findAll(withReturn) {
    if (!withReturn) {
      await User.find({});
    }
    return User.find({});
  }

  async update({ userId, update }, withReturn) {
    if (!withReturn) {
      await User.findOneAndUpdate({ _id: userId }, update, {
        returnOriginal: false,
      });
      return User.findOneAndUpdate({ _id: userId }, update, {
        returnOriginal: false,
      });
    }
  }
}

const userModel = new UserModel();

module.exports = userModel;
