// 정보들은 controller로부터 받아 검증 후 model을 통해 동작
const Product = require("../db/models/product-model");
const Category = require("../db/models/category-model");

class ProductService {
  // 상품 추가 로직 서비스
  // 저장한 데이터 controller에 반환
  async createProduct(newProduct) {
    if (!newProduct) throw new Error("상품 추가를 위한 데이터가 필요합니다.");

    const product = await Product.create(newProduct);

    return product;
  }
  // 삭제 로직 서비스
  async deleteProduct(productId) {
    if (!productId) throw new Error("제품을 삭제하기 위한 id가 필요합니다.");

    await Product.deleteById(productId);
  }
  // 상품수정 로직
  async updateProduct(productId, toUpdate) {
    if (!productId) throw Error("업데이트에 필요한 PRODUCT ID가 없습니다");

    const updateProduct = await Product.update({ productId, update: toUpdate });

    if (!updateProduct) throw new Error("제품을 찾지 못했습니다.");

    return updateProduct;
  }
  async getProductList() {
    try {
      const products = await Product.findAll();
      return products;
    } catch (err) {
      throw err;
    }
  }
  async getProductWithCategory(productId) {
    try {
      const products = await Product.findById(productId);
      return products;
    } catch (err) {
      throw err;
    }
  }
  // 특정 상품 조회 로직서비스
  async getProductById(id) {
    if (!id) throw Error("특정상품을 가져오기 위한 id가 없습니다.");

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "상품을 찾을 수 없습니다." });
    }
    return product;
  }
  // 카테고리별 상품조회 로직서비스
  async getProductByCategory(category) {
    if (!category) throw new Error("상품을 가져오기 위한 카테고리가 없습니다.");

    const products = await Product.findByCategory(category);

    return products;
  }
  // async getProductByTopic(topic) {
  //   if (!topic) throw new Error("상품을 가져오기 위한 토픽이 없습니다.");

  //   const products = await Product.findByTopic({ topic });

  //   return products;
  // }
}

const productService = new ProductService();
module.exports = productService;
