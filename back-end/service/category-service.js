
const categoryModel = require('../db/models/category-model');
class CategoryService {
  async addCategory(categoryInfo) {
    const { name } = categoryInfo; 
    const createdNewCategory = await categoryModel.create(categoryInfo);
    return createdNewCategory;
  }

  async getCategoryById(cid) {
    const category = await categoryModel.findById(cid);
    return category;
  }

  async getCategoryByName(name) {
    const category = await categoryModel.findByName(name);
    return category;
  }

  async getCategoryList() {
    const categoryList = await categoryModel.findAll();
    return categoryList;
  }

  async editCategory(cid, categoryInfo) {
    const updatedcategory = await categoryModel.update(cid, categoryInfo);
    return updatedcategory;
  }

  async removeCategory(cid) {
    await categoryModel.delete(cid);
  }
}

const categoryService = new CategoryService();

module.exports = new CategoryService();
