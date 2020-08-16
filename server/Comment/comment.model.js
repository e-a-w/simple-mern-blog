const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
