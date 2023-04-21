; // model을 가져온다.
const productModel = require('../db/models/product-model');
class ProductService { // 상품서비스에 대한 클래스를 만든다
  async addProduct(productInfo) { // 상품추가
    const createProduct = await productModel.create(productInfo);
    return createProduct;
  }
  async getProductById(bookId) { // 특정상품을 가져온다
    const product = await productModel.findByIds(bookId);
    return product;
  }
  async getProductList(bookIdArr) { // 상품을 가져온다.
    if(!bookIdArr) {
      const productList = await productModel.findAll();
      return productList;
    }else {
      const productList = await productModel.findByIds(bookIdArr);
      return productList;
    }
  }
  async editProduct(bookId, productInfo) { // 상품수정
    const updateProduct = await productModel.update(bookId, productInfo);
    return updateProduct;
  }
  async removeProduct(bookId) { // 상품삭제
    await productModel.delete(bookId);
  }
  async searchProduct(searchP){ // 상품검색
    const productList = await productModel.search(searchP);
    return productList;
  }

}

module.exports = new ProductService();
