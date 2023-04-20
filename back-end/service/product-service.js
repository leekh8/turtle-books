import productModel from '../models';

class ProductService {
  async addProduct(productInfo) {
    const createProduct = await productModel.create(productInfo);
    return createProduct;
  }
  async getProductById(bookId) {
    const product = await productModel.findById(bookId);
    return product;
  }
  async getProductList(bookIdArr) {
    if(!bookIdArr) {
      const productList = await productModel.findAll();
      return productList;
    }else {
      const productList = await productModel.findByids(bookIdArr);
      return productList;
    }
  }
  async editProduct(bookId, productInfo) {
    const updateProduct = await productModel.update(bookId, productInfo);
    return updateProduct;
  }
  async removeProduct(bookId) {
    await productModel.delete(bookId);
  }
  async searchProduct(searchP){
    const productList = await productModel.search(searchP);
    return productList;
  }

}



const productService = new ProductService();
export { productService };
