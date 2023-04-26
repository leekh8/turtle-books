// user-controller.js

// HTTP 요청 처리, user-service 호출, 응답 생성

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

const userService = require("../service/user-service");
const createError = require("../middlewares/error-handler"); // 오류 처리 미들웨어
class UserController {
  // register
  async registerUser(req, res, next) {
    try {
      const { userId, email, password } = req.body;
      const newUser = await userService.addUser({
        userId,
        lastName,
        firstName,
        email,
        address,
        password,
      });
      res.status(201).json({ success: true, newUser });
    } catch (error) {
      next(createError(400, error.message));
    }
  }

  // login
  async loginUser(req, res, next) {
    try {
      const { userId, password } = req.body;
      const user = await userService.findUser(userId, password);
      res.status(200).json(user);
    } catch (error) {
      next(createError(400, error.message));
    }
  }

  // get user-list
  async getUserList(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(createError(500, error.message));
    }
  }

  // edit my info
  async updateUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      const {
        password,
        email,
        lastName,
        firstName,
        address,
        birthDate,
        userRole,
      } = req.body;
      const updatedUser = await userService.updatedUser(userId, {
        password,
        email,
        lastName,
        firstName,
        address,
        birthDate,
        userRole,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(createError(400, error.message));
    }
  }

  // delete my info
  async deleteUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      await userService.deleteUser(userId);
      res.status(204).end();
    } catch (error) {
      next(createError(500, error.message));
    }
  }
}

module.exports = UserController;
