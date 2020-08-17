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

router.get("/:commentId", (request, response) => {
  Comment.findById(request.params.commentId, (error, comment) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!comment) {
        response.sendStatus(410);
      } else {
        response.status(200).json(comment);
      }
    }
  });
});

router.delete("/:commentId", (request, response) => {
  Comment.findByIdAndRemove(request.params.commentId, (error, comment) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!comment) {
        response.sendStatus(410);
      } else {
        response.status(204).json("Comment removed!");
      }
    }
  });
});

router.put("/:commentId", (request, response) => {
  Comment.findByIdAndUpdate(
    request.params.commentId,
    request.body,
    { new: true },
    (error, comment) => {
      if (error) {
        console.log(`Error updating Article, ${new Date()}: ${error}`);
        response.status(400).json(error);
      } else {
        response.status(201).json(comment);
      }
    }
  );
});

module.exports = router;
