const express = require('express');
const router = express.Router();
const Product = require('../../db');

// 모든 도서 목록 조회
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 새로운 도서 추가
router.post('/', async (req, res) => {
    const {title, author, category, publiser, price, publised_date, stock } = req.body
  const product = new Product({
    title,
    author,
    category,
    publiser,
    price,
    publised_date,
    stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 도서 수정
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.publisher != null) {
    res.book.publisher = req.body.publisher;
  }
  if (req.body.price != null) {
    res.book.price = req.body.price;
  }
  if (req.body.published_date != null) {
    res.book.published_date = req.body.published_date;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 도서 삭제
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: '도서가 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: '도서를 찾을 수 없습니다.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
