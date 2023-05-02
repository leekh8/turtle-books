const express = require('express');
const router = express.Router();
const Product = require('../db/schemas/product-schema');

// 모든 도서 목록 조회
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 새로운 도서 추가
router.post('/', async (req, res) => {
    const {title, author, category, publisher, price, publised_date, stock } = req.body
  const product = new Product({
    title,
    author,
    publisher,
    publised_date,
    price,
    category,
    stock,
    topic
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 특정 도서 수정.
//특정 상품 찾아오는 미들웨어(getProduct) 후 실행.
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.title != null) {
    res.product.title = req.body.title;
  }
  if (req.body.author != null) {
    res.product.author = req.body.author;
  }
  if (req.body.publisher != null) {
    res.product.publisher = req.body.publisher;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.published_date != null) {
    res.product.published_date = req.body.published_date;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 도서 삭제 : 특정 도서 찾은 후 삭제.
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: '도서가 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//특정 강품 찾아오기
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: '도서를 찾을 수 없습니다.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;