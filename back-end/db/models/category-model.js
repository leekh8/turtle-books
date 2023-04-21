
const mongoose = require('mongoose');
const categorySchema = require('../schemas/category-schema');

const category = mongoose.model("category", categorySchema);

class CategoryModel { // 카테고리 모델
  async findById(cid) { // 
    try {
      const category = await category.findOne({ _id: cid});
      return category;
    } catch(error) {
      const err = new Error ("카테고리 정보를 불러오지 못했습니다.(ID)");
      err.statusCode = 400;
      throw error; 
    }
  }
  async findByname(name) {
    try {
      const category = await category.findOne({name});
      return category;
    } catch(error) {
      const err = new Error("카테고리 정보를 불러오지 못했습니다.(name)");
      err.statusCode = 400;
      throw err;
    }
  }
  async create(categoryInfo) {
    try {
      const createNCategory = await category.create(categoryInfo);
      return createNCategory;
    } catch(error) {
      const err = new Error("카테고리 생성 실패");
      err.statusCode = 400;
      throw error;
    }
  }
  async update(cid, categoryInfo) {
    const filter = { _id: cid };
    const option = { returnOriginal: false };
    try {
      const updateCategory = await category.findOneAndUpdate(
        filter,
        categoryInfo,
        option
      );
      return updateCategory;
    } catch(error) {
      const err = new Error("카테고리 수정 실패");
      err.statusCode = 400;
      throw error;
    }
  }
  async delete(cid) {
    try {
      await category.deleteOne({ _id: cid });
    } catch(error) {
      const err = new Error("카테고리 삭제 실패");
      err.statusCode = 400;
      throw err;
    }
  }
}


module.exports = new CategoryModel();