import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Jumbotron, Alert, Form, Card, Button, Modal } from "react-bootstrap";

const Manage = ({ history }) => {
  // Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Bootstrap Alert
  const [showAlert, setShowAlert] = useState(false);

  // Article-Related
  const [clickedArticle, setClickedArticle] = useState("");
  const [articles, setArticles] = useState([]);
  const [checkedArticles, setCheckedArticles] = useState([]);

  const getCheckedIds = (id) => {
    return (e) => {
      e.persist();
      if (e.target.checked === true) {
        setCheckedArticles([...checkedArticles, id]);
      } else {
        setCheckedArticles(
          checkedArticles.filter((ids) => {
            return ids !== id;
          })
        );
      }
    };
  };

  const deleteAll = () => {
    if (checkedArticles.length > 0) {
      fetch("/articles/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "ids": checkedArticles }),
      })
        .then((res) => {})
        .catch((err) => console.error(err));
    }
  };

  const articleDelete = (id) => {
    fetch(`/articles/${id}`, { method: "DELETE" }).catch((err) =>
      console.error(err)
    );
  };

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
        <h1>Article Management</h1>
        <p>Here you can edit and delete all articles created on this blog.</p>

        <Alert show={showAlert} variant="danger">
          <Alert.Heading>Warning</Alert.Heading>
          <p>
            Are you sure you want to delete all checked articles? This will
            remove them PERMANENTLY.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => setShowAlert(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={() => deleteAll()}>
              Yes, Delete All Checked Articles
            </Button>
          </div>
        </Alert>

        {!showAlert && (
          <Button variant="danger" onClick={() => setShowAlert(true)}>
            Delete All Checked Articles
          </Button>
        )}
      </Jumbotron>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {articles
          .map((item) => {
            return (
              <Card
                key={item._id}
                style={{ width: "18rem", margin: "0 10px 20px" }}
              >
                <Card.Header
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link to={`/articles/${item._id}`}>{item.title}</Link>
                  <Form>
                    <Form.Check
                      type="checkbox"
                      onChange={getCheckedIds(item._id)}
                    />
                  </Form>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {item.text.slice(0, 100)}
                    {item.text.length > 100 && "..."}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <p style={{ fontSize: "12px" }}>
                    <b>Created:</b>{" "}
                    {moment(item.createdAt).format("M-D-YY, h:mm a")}
                    <br />
                    <b>Updated:</b>{" "}
                    {moment(item.updatedAt).format("M-D-YY, h:mm a")}
                    <br />
                    <b>
                      {item.comments.length} comment
                      {item.comments.length !== 1 && "s"}
                    </b>
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => history.push(`/articles/${item._id}`)}
                    >
                      Read More!
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => history.push(`/articles/${item._id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setClickedArticle(item._id);
                        handleShow();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            );
          })
          .reverse()}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
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
            onClick={() => {
              articleDelete(clickedArticle);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </article>
  );
};

export default Manage;
