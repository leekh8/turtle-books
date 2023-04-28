// 클라이언트로부터 받은 요청 처리, 데이터 컨트롤
// 추출한 데이터는  Model한테 전달

const ProductService = require("../service/product-service");

class ProductController {
  // 새로운 책 생성하는데 필요한 데이터 추출, 데이터는 service에 전달하고 새로운 책 생성
  async createProduct(req, res) {
    try {
      const {
        title,
        author,
        publisher,
        publishDate,
        price,
        categoryId,
        stock,
        topic,
        decription,
        imageUrl,
      } = req.body;

      const product = await ProductService.createProduct({
        title,
        author,
        publisher,
        publishDate,
        price,
        categoryId,
        stock,
        topic,
        decription,
        imageUrl,
      });

      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  // 책 삭제, 클라이언트로부터 받은 요청처리, 삭제할 책 id추출
  // 추출된 id는 service에 전달하고 상품 삭제
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      await ProductService.deleteProduct(id);

      res.status(204).json({ success: true, message: "ok" });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  // 상품수정, 요청처리, 수정할 책 id와 수정할 내용 추출, 추출한 정보 service에 전달, 상품 수정
  async updateProduct(req, res) {
    try {
      const id = req.params.productId;
      const update = req.body;

      const updateProduct = await ProductService.updateProduct(id, update);

      res.status(200).json({ success: true, data: updateProduct });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const products = await ProductService.getProductList();
      res.status(200).json(products);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  // 특정상품조회, id추출, 해당id로 ProductService호출
  // ProductService로 해당상품id 데이터베이스 조회
  async getProductById(req, res) {
    try {
      const Id = req.params.productId;

      const product = await ProductService.getProductById(Id);

      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  // 카테고리별 상품조회, 클라언트로부터 받은 요청에서 카테고리를 추출 후
  // 해당 카테고리로 ProductService를 호출
  // ProductService에서는 해당 카테고리에 해당하는 상품들을 데이터베이스에서 조회
  async getProductByCategory(req, res) {
    try {
      const category = req.params.categoryId;

      const products = await ProductService.getProductByCategory(category);

      res.status(200).json({ success: true, data: products });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  async getProductByTopic(req, res) {
    try {
      const { topic } = req.params;

      const product = await ProductService.getProductByTopic(topic);

      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
const productController = new ProductController();
module.exports = productController;
