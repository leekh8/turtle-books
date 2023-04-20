const express = require('express');
const router = express.Router();

const Cart = require('../../db');

//로그인 되었을 경우 장바구니 렌더링
router.get('/', async(req,res)=>{
    if(req.query.login){
        const carts = await Cart.find({})
        res.render('cart/cart-main', { carts });
        return;
    } else {
        return res.status(400).send('로그인이 필요한 기능입니다.')
    }

})



module.exports = router;