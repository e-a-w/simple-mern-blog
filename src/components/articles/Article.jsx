import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import Comments from "./Comments";

const Article = ({ history, match }) => {
  // Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Articles
  const [article, setArticle] = useState({});

  useEffect(() => {
    //get article
    fetch(`/articles/${match.params.articleId}`)
      .then((response) => response.json())
      .then((article) => {
        setArticle(article);
      })
      .catch((error) => console.error(error));
  }, [article]);

  const articleDelete = (id) => {
    fetch(`/articles/${id}`, { method: "DELETE" })
      .then((res) => {
        history.push("/articles");
      })
      .catch((err) => console.error(err));
  };

  return (
    <article>
      <Card>
        <Card.Header style={{ textAlign: "center" }}>
          <h1>{article.title}</h1>
        </Card.Header>
        <Card.Body style={{ whiteSpace: "pre-wrap" }}>{article.text}</Card.Body>
        <Card.Footer style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{ marginRight: "20px" }}
            variant="success"
            onClick={() =>
              history.push(`/articles/${match.params.articleId}/edit`)
            }
          >
            Edit
          </Button>
          <Button
            variant="danger"
            // onClick={() => articleDelete(match.params.articleId)}
            onClick={() => handleShow()}
          >
            Delete
          </Button>
        </Card.Footer>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the article? This will remove it
          PERMANENTLY from the blog.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => articleDelete(match.params.articleId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Comments article={match.params.articleId} />
    </article>
  );
};

export default Article;
