// 정보들은 controller로부터 받아 검증 후 model을 통해 동작
const Category = require("../db/models/category-model");

class CategorService {
  // 카테고리 조회 서비스 로직
  // 인자를 받지않고 모든 카테고리 정보 반환
  async getCategoryList() {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (err) {
      throw err;
    }
  }
  // 카테고리 추가 서비스 로직
  // Category 모델을 사용하여 새로운 카테고리 추가
  async createCategory(newName) {
    if (!newName)
      throw new Error("카테고리를 만들기 위해서는 이름이 필요합니다.");

    const category = Category.create(newName);

    return category;
  }
  // 카테고리 삭제 서비스로직
  // Category 모델을 사용하여 해당ID를 가진 카테고리를 데이터베이스에서 삭제
  async deleteCategory(categoryId) {
    if (!categoryId) throw new Error("삭제하기 위한 카테고리ID가 필요합니다.");

    await Category.deleteById(categoryId);
  }
  // 카테고리 수정 서비스 로직
  // Category 모델을 사용하여
  // 해당 ID를 가진 카테고리를 데이터베이스에서 찾고 이름 수정
  async updateCategory(categoryId, toUpdate) {
    if (!categoryId) throw new Error("수정을 위한 카테고리 ID가 없습니다.");
    if (!toUpdate) throw new Error("수정을 위한 카테고리이름이 없습니다.");

    const updatedCategory = await Category.update(categoryId, toUpdate);

    return updatedCategory;
  }
}
const categorService = new CategorService();

module.exports = categorService;
