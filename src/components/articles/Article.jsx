import React, { useState, useEffect } from "react";

const Article = ({ match }) => {
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch(`/articles/${match.params.articleId}`)
      .then((response) => response.json())
      .then((article) => setArticle(article))
      .catch((error) => alert(error));
  });

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.text}</p>
    </article>
  );
};

export default Article;
