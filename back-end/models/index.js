const mongoose = require("mongoose");
const PostSchema = require("../models/schemas/category-schema");
const UserSchema = require("../models/schemas/user-schema");

exports.Post = mongoose.model("Post", PostSchema);
exports.User = mongoose.model("User", UserSchema);
