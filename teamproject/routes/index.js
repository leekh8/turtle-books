"use strict";
//모듈
const express = require('express');
const router = express.Router();

//라우팅 
router.get('/order', (req, res)=>{
    res.render('/order');
});


module.exports = router;