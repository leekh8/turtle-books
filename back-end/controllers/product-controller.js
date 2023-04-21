const json = require('express');
const productService = require('../service/product-service');

class ProductController {
  async addProduct(req, res, next) { 
    const { title, author, publisher, published_date, price, category, stock } = req.body;

    if(
      !title||
      !author||
      !publisher||
      !published_date||
      !price||
      !category||
      !stock
    ){
      return res.status(400).json("입력하지않은 데이터가 있습니다.");
    }

    try {
      const createNProduct = await productService.addProduct({
        title, author, publisher, published_date, price, category, stock
      });
      return res.status(200).json(createNProduct);
    }catch(e) { 
      next(e); 
    }
  }

  async getProductList(req, res, next) { //카테고리별
    if(Object.keys(req.query).length === 0) {
      const productList = await productService.getProductList();
      return res.status(200).json(productList);
    } else {
      const { bid } = req.query;
      if(!bid) {
        return res.status(200).json("query data가 bId에 없습니다.");
      } 
      const bidArr = bid.split(",");

      try {
        const productList = await productService.getProductList(bidArr);
        return res.status(200).json(productList);
      } catch(e) {
        next(e);
      }
    }
  }
  async getProduct(req, res, next) {
    const { bid } = req.params;
    
    try {
      const product = await productService.getProductById(bid);
      return res.status(200).json(product);
    } catch(e) {
      next(e);
    }
  }
  async editProduct(req, res, next) {
    const { bid } = req.params;
    try {
      const updateProduct = await productService.editProduct(bid, req.body);
      return res.status(200).json(updateProduct);
    } catch(e) {
      next(e);
    } 
  }
  async removeProduct(req, res, next) {
    const { bid } = req.params;
    
    try {
      await productService.removeProduct(bid);
      res.status(200).json(`삭제 완료 : ${bid}`);
    } catch(e) {
      next(e);
    }  
  }
  async searchProduct(req, res, next) {
    if(Object.keys(req.query).length === 0) {
      try{
        const productList = await productService.getProductList();
        return res.status(200).json(productList);
      } catch(e) {
        next(e);
      }
    } else {
      try {
        const searchBook = req.query;
        const productList = await productService.searchProduct(searchBook);
        return res.status(200).json(productList);
      } catch(e) {
        next(e);
      }
    }
  }
}

module.exports = new ProductController();