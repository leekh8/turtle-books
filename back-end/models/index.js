const mongoose = require("mongoose");
const PostSchema = require("./schemas/category-schema");
const UserSchema = require("./schemas/product-schema");

exports.Post = mongoose.model("Post", PostSchema);
exports.User = mongoose.model("User", UserSchema);
