// Product 모델은 MongoDB의 ObjectId를 사용하여 ID를 저장

const mongoose = require("mongoose");
const categorySchema = require("../schemas/category-schema");

const Category = mongoose.model("Category", categorySchema);

class CategoryModel {
  async create(categoryInfo) {
    const createNewCategory = await Category.create(categoryInfo);
    return createNewCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }
  async findByName(name) {
    const categories = await Category.findOne({ name: name });
    return categories;
  }
  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }

  async deleteById(categoryId) {
    const result = await Category.deleteOne({ _id: categoryId });
    return result;
  }
}

// module.exports = mongoose.model("Category", categorySchema);
const categoryModel = new CategoryModel();

module.exports = categoryModel;
