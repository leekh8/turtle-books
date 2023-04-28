const mongoose = require("mongoose");
const productSchema = require("../schemas/product-schema");

const Product = mongoose.model("products", productSchema);

class ProductModel {
  async findByTitle(title) {
    const product = await Product.findOne({ title });
    return product;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  async findByCategory(categoryId) {
    const product = await Product.find({ categoryId });
    return product;
  }

  // async findByTopic(topic) {
  //   const product = await Product.find({ topic });
  //   return product;
  // }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  async deleteById(productId) {
    const result = await Product.deleteOne({ _id: productId });
    return result;
  }
}

const productModel = new ProductModel();

module.exports = productModel;

// module.exports = mongoose.model("Product", productSchema);
