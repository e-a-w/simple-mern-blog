const express = require("express");
const router = express.Router();
const Article = require("./article.model");

router.get("/", (request, response) => {
  Article.find((error, articles) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!articles) {
        response.sendStatus(410);
      } else {
        response.status(200).json(articles);
      }
    }
  });
});

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

router.delete("/delete", (request, response) => {
  const idArray = request.body.ids;
  Article.deleteMany({ _id: { $in: idArray } }, (error, article) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!article) {
        response.sendStatus(410);
      } else {
        response.status(204).json("Articles removed!");
      }
    }
  });
});

router.get("/search/:searchTerm", (request, response) => {
  Article.find(
    {
      $or: [
        {
          text: {
            $regex: `${request.params.searchTerm}`,
            $options: "i",
          },
        },
        {
          title: {
            $regex: `${request.params.searchTerm}`,
            $options: "i",
          },
        },
      ],
    },
    (error, articles) => {
      if (error) {
        console.log(error);
        response.status(400).json(error);
      } else {
        if (!articles) {
          response.sendStatus(410);
        } else {
          response.status(200).json(articles);
        }
      }
    }
  );
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

router.delete("/:articleId", (request, response) => {
  Article.findByIdAndRemove(request.params.articleId, (error, article) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!article) {
        response.sendStatus(410);
      } else {
        response.status(204).json("Article removed!");
      }
    }
  });
});

router.put("/:articleId", (request, response) => {
  Article.findByIdAndUpdate(
    request.params.articleId,
    request.body,
    { new: true },
    (error, article) => {
      if (error) {
        console.log(`Error updating Article, ${new Date()}: ${error}`);
        response.status(400).json(error);
      } else {
        response.status(201).json(article);
      }
    }
  );
});

module.exports = router;
