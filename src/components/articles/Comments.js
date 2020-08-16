import React, { useState } from "react";
import moment from "moment";
import { Table, Form, Card, Button } from "react-bootstrap";

const Comments = ({ comments, article, history }) => {
  const [comment, setComment] = useState({ comment: "" });

  const addComment = () => {
    fetch(`/articles/${article}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
      .then((response) => {
        response.json();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Card style={{ marginTop: "50px", padding: "20px" }}>
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold" }}>Add Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="comment text..."
              required={true}
              onChange={(e) => setComment({ ...comment, text: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit Comment
          </Button>
        </Form>
      </Card>
      <Table striped bordered style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Comment Date: </th>
            <th>Comment Text: </th>
          </tr>
        </thead>
        <tbody>
          {comments
            .map((comment) => {
              return (
                <tr key={comment._id}>
                  <td style={{ width: "20%" }}>
                    {moment(comment.createdAt).format("M-D-YY, h:mm a")}
                  </td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{comment.text}</td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </Table>
    </>
  );
};

export default Comments;
