import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Articles = ({ history }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetch("/articles")
      .then((response) => response.json())
      .then((articles) => {
        if (mounted) {
          if (articles) {
            return setArticles(articles);
          } else {
            return null;
          }
        }
      })
      .catch((error) => console.error(error));

    return () => {
      mounted = false;
    }; // found this on Google to fix an error I was experiencing
  }, [articles]);

  return (
    <article>
      <Jumbotron>
        <h1>All Articles!</h1>
        <p>Here you can find all articles created on this blog.</p>
      </Jumbotron>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {articles
          .map((item) => {
            return (
              <Card
                key={item._id}
                style={{ width: "100%", margin: "40px auto" }}
              >
                <Card.Header
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  <Link to={`/articles/${item._id}`}>{item.title}</Link>
                </Card.Header>
                <Card.Body>
                  <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                    {item.text.slice(0, 1500)}
                    {item.text.length > 100 && "..."}
                  </Card.Text>
                </Card.Body>
                <Card.Footer style={{ textAlign: "center" }}>
                  <Button
                    variant="secondary"
                    onClick={() => history.push(`/articles/${item._id}`)}
                  >
                    Read More!
                  </Button>
                </Card.Footer>
              </Card>
            );
          })
          .reverse()}
      </div>
    </article>
  );
};

export default Articles;
