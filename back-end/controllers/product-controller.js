import { json } from 'express';
import { productService } from '../service';

class ProductController {
  async addProduct(req, res, next) {
    const { title, description, author, publisher, publicationDate, price, category, stock } = req.body;

    if(
      !title||
      !description||
      !author||
      !publisher||
      !publicationDate||
      !price||
      !category||
      !stock
    ){
      return res.status(400).json("입력하지않은 데이터가 있습니다.");
    }

    try {
      const createNProduct = await productService.addProduct({
        title, description, author, publisher, publicationDate, price, category, stock
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
      const { bId } = req.query;
      if(!bId) {
        return res.status(200).json("query data가 bId에 없습니다.");
      } 
      const bIdarr = bId.split(",");

      try {
        const productList = await productService.getProductList(bIdarr);
        return res.status(200).json(productList);
      } catch(e) {
        next(e);
      }
    }
  }
  async getProduct(req, res, next) {
    const { bId } = req.params;
    
    try {
      const product = await productService.getProductById(bId);
      return res.status(200).json(product);
    } catch(e) {
      next(e);
    }
  }
  async editProduct(req, res, next) {
    const { bId } = req.params;
    try {
      const updateProduct = await productService.editProduct(bId, req.body);
      return res.status(200).json(updateProduct);
    } catch(e) {
      next(e);
    } 
  }
  async removeProduct(req, res, next) {
    const { bId } = req.params;
    
    try {
      await productService.removeProduct(bId);
      res.status(200).json(`삭제 완료 : ${bId}`);
    } catch(e) {
      next(e);
    }  
  }
  async searchProduct(req, res, next) {

  }
}