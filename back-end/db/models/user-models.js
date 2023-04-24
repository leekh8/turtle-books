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
userRole:  사용자 권한
*/

const model = require("mongoose");
const UserSchema = require("../schemas/user-schema");

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email, withReturn = true) {
    const user = await User.findOne({ email });
    if (withReturn) {
      return user;
    }
  }

  async findById(userId, withReturn = true) {
    const user = await User.findOne({ _id: userId });
    if (withReturn) {
      return user;
    }
  }

  async create(userInfo, withReturn = true) {
    const createdNewUser = await User.create(userInfo);
    if (withReturn) {
      return createdNewUser;
    }
  }

  async findAll(withReturn = true) {
    const users = await User.find({});
    if (withReturn) {
      return users;
    }
  }

  async update({ userId, update }, withReturn = true) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);

    if (withReturn) {
      return updatedUser;
    }
  }
}

const userModel = new UserModel();

module.exports = { userModel };
