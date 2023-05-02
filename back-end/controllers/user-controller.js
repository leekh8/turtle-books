// user-controller.js

// HTTP 요청 처리, user-service 호출, 응답 생성

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

const userService = require("../service/user-service");
const createError = require("../middlewares/error-handler"); // 오류 처리 미들웨어
class UserController {
  // register
  async registerUser(req, res) {
    try {
      const { email, password, role } = req.body;
      const newUser = await userService.addUser({
        //userId,
        // lastName,
        // firstName,
        email,
        // address,
        password,
        role,
      });
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }
  // login
  async loginUser(req, res) {
    try {
      const { userId, password } = req.body;
      const user = await userService.loginUser({ userId, password });
      res.status(200).json(user);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
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

  // get my info
  async getUser(req, res, next) {
    try {
      const userId = req.params;
      const currentUserInfo = await userService.getUserData(userId);
      res.status(200).json(currentUserInfo);
    } catch (error) {
      next(createError(500, error.message));
    }
  }
  // edit my info
  async updateUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      const { password, email, fullName, address, birthDate, role } = req.body;
      const updatedUser = await userService.updatedUser(userId, {
        password,
        email,
        fullName,
        address,
        birthDate,
        role,
      });
      res.status(200).json({ updatedUser });
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

  async changeRole(req, res) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("set header's content-type");
      }
      const userId = req.params.userId;
      const role = req.body.role;

      const updatedUserInfo = await userService.changRole(userId, role);
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(createError(500, error.message));
    }
  }
}

const userController = new UserController();
module.exports = userController;
