const router = require("express").Router({ mergeParams: true });
const Article = require("../article/article.model");
const Comment = require("./comment.model");

router.get("/", (request, response) => {
  Article.findById(request.params.articleId)
    .populate("comments")
    .exec()
    .then((articleWithComments) => {
      response.json(articleWithComments);
    })
    .catch((err) => response.status(500).json("Error: " + err));
});

router.post("/", (request, response) => {
  const newComment = new Comment(request.body);
  newComment.article = request.params.articleId;
  //   response.send(newComment);

  return Article.findById(request.params.articleId)
    .then((article) => {
      newComment
        .save()
        .then((createdComment) => {
          article.comments.push(createdComment._id);
          article
            .save()
            .then(response.json(createdComment))
            .catch((err) => response.status(500).json("Error: " + err));
        })
        .catch((err) => response.status(500).json("Error: " + err));
    })
    .catch((err) => response.status(500).json("Error: " + err));
});

module.exports = router;
