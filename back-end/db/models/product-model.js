import { model } from 'mongoose';
import { ProductSchema } from '../schemas/products-schema';
import { categoryModel } from './category-model';

const product = model("product", ProductSchema); // 스키마 가져옴

class ProductModel { // 모델 클래스를 만든다
  async findById(bid) { // 특정 상품을 찾는 기능
    try {
      const product = await product.findOne({ _id: bid }); // 특정 아이디의 데이터를 product에 넣는다.
      return product;
    } catch (err) { // 에러처리
      const error = new Error("ID 기반으로 검색 상품 탐색에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async findByIds(bidArr) { // 특정 카테고리에 해당되는 상품 리스트를 찾는다.
    try {
      const productList = new Array(); // 배열 생성

      for (const bid of bidArr) { // _id 필드값이 bid인 상품 조회, 조회된 상품 정보에  해당 상품의 category정보 가져옴
        const product = await product.findOne({ _id: bid }).populate( "category");
        if (product) { // 상품이 존재하면 배열에 상품추가
          productList.push(product);
        }
      }
      return productList;
    } catch (err) {
      const error = new Error("상품 리스트 검색 실패(ID)");
      error.statusCode = 400;
      throw error;
    }
  }

  async findAll() {
    try {
      const productList = await product.find({});
      return productList;
    } catch (err) {
      const error = new Error("상품 수정 실패");
      error.statusCode = 400;
      throw error;
    }
  }

  async create(productInfo) {
    try {
      productInfo.category = product.formatHashtags(productInfo.category);
      let createdNewProduct = await product.create(productInfo);
      return createdNewProduct;
    } catch (err) {
      const error = new Error("상품 생성 실패");
      error.statusCode = 400;
      throw error;
    }
  }

  async update(bid, productInfo) {
    const filter = { _id: bid };
    const option = { returnOriginal: false };

    try {
      const updatedProduct = await product.findOneAndUpdate(
        filter,
        productInfo,
        option
      );

      return updatedProduct;
    } catch (err) {
      const error = new Error("상품 수정 실패");
      error.statusCode = 400;
      throw error;
    }
  }

  async delete(bid) {
    await product.deleteOne({ _id: bid });
  }

  async search(searchBy) {
    const { category } = searchBy;
    try {
      if (category) {
        const productCategory = await categoryModel.findByName(category);
        searchBy.category = productCategory._id;
      }

      const productList = await product.find(searchBy);

      if (productList.length > 0) {
        return productList;
      } else {
        return [];
      }
    } catch (err) {
      const error = new Error("상품 검색 실패");
      error.statusCode = 400;
      throw error;
    }
  }
}

const productModel = new ProductModel();

export { productModel };
