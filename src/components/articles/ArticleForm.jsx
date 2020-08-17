import { Form, Button, Jumbotron } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const ArticleForm = ({ match, history }) => {
  let initialState = { title: "", text: "" };
  const [values, setValues] = useState(initialState);

  //if editing, get single article info
  useEffect(() => {
    if (match.params.articleId) {
      fetch(`/articles/${match.params.articleId}`)
        .then((res) => res.json())
        .then((data) => {
          setValues({ ...values, title: data.title, text: data.text });
        });
    }
  }, [match.params.articleId]);

  //submit edited values OR submit new values
  const handleSubmit = (e) => {
    e.preventDefault();

    if (match.params.articleId) {
      fetch(`/articles/${match.params.articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            alert("Article successfully edited");
            return response.json().then((article) => {
              history.push(`/articles/${article._id}`);
            });
          }
        })
        .catch((error) => alert(error));
    } else {
      fetch("/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            alert("Article successfully created");
            return response.json().then((article) => {
              history.push(`/articles/${article._id}`);
            });
          }
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <>
      <Jumbotron>
        <h1>{match.params.articleId ? "Edit" : "Create"} An Article</h1>
        <p>
          Here you can {match.params.articleId ? "edit an" : "create a new"}{" "}
          article.
        </p>
      </Jumbotron>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
          <Form.Control
            defaultValue={match.params.articleId && values.title}
            type="text"
            placeholder="Title of your article..."
            required={true}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: "bold" }}>Text</Form.Label>
          <Form.Control
            defaultValue={match.params.articleId && values.text}
            as="textarea"
            rows="5"
            placeholder="Text for your article..."
            required={true}
            onChange={(e) => setValues({ ...values, text: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ArticleForm;
