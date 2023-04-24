//클라이언트로부터 받은 요청 처리, 필요한 데이터 추출

const CategoryService = require('../service/category-service');

// 새로운 카테고리를 추가하는 컨트롤러
// CategorService에서 새로운 카테고리를 데이터베이스에 추가
class CategoryController {
  // 카테고리 추가 컨트롤러
  // 추출된 이름으로 CategoryService호출
  async createCategory(req, res) {
    try {
      const { name } = req.body;
  
      const category = await CategoryService.createCategory(name);
  
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  // 카테고리 삭제 컨트롤러
  // 추출된 id로 CategoryServeice호출 
  async deleteCategory (req, res) {
    try {
      const { id } = req.params;
  
      await CategoryService.deleteCategory(id);
  
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  // 카테고리 수정 컨트롤러
  // 카테고리ID와 수정할 내용 추출
  // 해당 ID로 CategoryService호출 후 카테고리 수정
  async updateCategory (req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      const updatedCategory = await CategoryService.updateCategory(id, name);
  
      res.status(200).json({ success: true, data: updatedCategory });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}

module.exports = new CategoryController();
