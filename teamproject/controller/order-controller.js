const mongoose = require('mongoose');
const Order = require('../db/models/order-model');

// mongoose를 사용하여 mongoDB와 연결
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = {
  // '/order' 경로에 대한 POST method 핸들러
  async createOrder(req, res) {
    try {
        // 이 부분을 쿠키로 유저 로그인 정보를 받아와서 처리하려면..?
      const { name, address, phoneNumber } = req.body;
      // sessionStorage에서 장바구니 정보 가져오기
      const items = JSON.parse(sessionStorage.getItem('cart')); 
      

      // Order 모델을 사용하여 DB에 저장할 데이터 생성
      const order = new Order({
        name,
        address,
        phoneNumber,
        items
      });

      // 생성한 데이터를 DB에 저장
      await order.save();
      res.send('주문이 완료되었습니다.');
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 오류가 발생했습니다.');
    }
  }
};