const { Router } = require("express");
const mongoose = require("mongoose");

const User = require("../../../models/user");

const router = Router();

app.use(router.json());

// 회원가입 라우터
// POST의 /register 라우터 생성
// 회원 가입 정보를 받아 db에 저장
router.post("/register", async (req, res) => {
  // 회원 가입에 필요한 정보
  try {
    const { userid, email, password } = req.body;

    // 유효성 검사
    if (!userid || !email || !password) {
      return res.status(400).json({ message: `input every field` });
    }

    // email 중복 확인
    await User.findOne({ email }).then((user) => {
      if (user)
        return res.status(409).json({ message: `already registered email` });
    });

    const hashedPassword = await hashPassword(password);
    // new user 생성
    const newuser = new User({
      userid,
      email,
      password: hashedPassword,
    });

    // 사용자 정보 저장
    // await 사용해 데이터가 db에 저장될 때 까지 기다림
    await newuser.save();

    res.status(201).json({ message: `register success`, token });
  } catch (error) {
    // 에러 발생 처리
    console.log(error);
    res.status(500).json({ message: `server error` });
  }
});

export { userRouter };
