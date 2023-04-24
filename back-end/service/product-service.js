// 정보들은 controller로부터 받아 검증 후 model을 통해 동작
const Product = require('../db/models/product-model');

class ProductService {
  // 상품 추가 로직 서비스
  // 저장한 데이터 controller에 반환
  async createProduct(newProduct) {
    if (!newName) throw new Error('상품 추가를 위한 데이터가 필요합니다.');
    
    const product = new Product(newProduct);
    
    await product.save();
    
    return res.status(201).json(product);
  }
  // 삭제 로직 서비스
  async deleteProduct(id) {
    if(!id) throw new Error("제품을 삭제하기 위한 id가 필요합니다.");
    
    await Product.findByIdAndDelete(id);
  }
  // 상품수정 로직
  async updateProduct(id, update) {
    if(!id) throw Error("업데이트에 필요한 id가 없습니다");

    const updateProduct = await Product.findByIdAndUpdate(id, update, {new: true,});

    if(!updateProduct) throw new Error("제품을 찾지 못했습니다.");

    return updateProduct;
  }
  // 특정 상품 조회 로직서비스
  async getProductById(id) {
    if(!id) throw Error("특정상품을 가져오기 위한 id가 없습니다.");
    
    const product = await Product.findById(id);
    if(!product) {
      return res.status(404).json({success: false, message: "상품을 찾을 수 없습니다."});
    }
    return product;
  }
  // 카테고리별 상품조회 로직서비스
  async getProductByCategory (category) {
    if(!category) throw new Error("상품을 가져오기 위한 카테고리가 없습니다.");
    
    const products = await Product.find({ category });

    return products;
  }
  async getProductByTopic (topic) {
    if(!topic) throw new Error("상품을 가져오기 위한 토픽이 없습니다.");
    
    const products = await Product.find({ topic });

    return products;
  }
  
}
module.exports = new ProductService();