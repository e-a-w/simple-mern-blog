const express = require("express");
const router = express.Router();
const Article = require("./article.model");

router.post("/", (request, response) => {
  Article.create(request.body, (error, article) => {
    if (error) {
      console.log(`Error creating Article, ${new Date()}: ${error}`);
      response.status(400).json(error);
    } else {
      response.status(201).json(article);
    }
  });
});

router.get("/:articleId", (request, response) => {
  Article.findById(request.params.articleId, (error, article) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!article) {
        response.sendStatus(410);
      } else {
        response.status(200).json(article);
      }
    }
  });
});

module.exports = router;
