
const categoryService = require("../service/category-service");

class CategoryController {
  async addCategory(req, res, next) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json("name을 입력하세요");
    }

    try {
      const createdNCategory = await categoryService.addCategory({
        name,
      });
      return res.status(200).json(createdNCategory);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryList(req, res, next) {
    try {
      const categoryList = await categoryService.getCategoryList();
      return res.status(200).json(categoryList);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryById(req, res, next) {
    const { cid } = req.params;

    try {
      const Category = await categoryService.getCategoryById(cid);
      return res.status(200).json(Category);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryByName(req, res, next) {
    const name = req.query.category;

    try {
      const Category = await categoryService.getCategoryByName(name);
      res.status(200).json(Category);
    } catch (e) {
      next(e);
    }
  }

  async editCategory(req, res, next) {
    const { cid } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json("입력 데이터 부족");
    }

    try {
      const updatedCategory = await categoryService.editCategory(cid, {
        name,
      });

      return res.status(200).json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async removeCategory(req, res, next) {
    const { cid } = req.params;

    try {
      await categoryService.removeCategory(cid);
      res.status(200).json(`카테고리 삭제 완료(ID : ${cid})`);
    } catch (e) {
      next(e);
    }
  }
}



module.exports = new CategoryController();
