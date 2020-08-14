const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  text: String,
});

module.exports = mongoose.model("Article", ArticleSchema);
