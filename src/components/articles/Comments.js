import React, { useState, useEffect } from "react";
import moment from "moment";
import { Table, Form, Card, Button, Modal, FormControl } from "react-bootstrap";

const Comments = ({ article }) => {
  // Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Comment-Related
  const [clickedComment, setClickedComment] = useState("");
  const [comment, setComment] = useState({ comment: "" });
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState({ text: "" });
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    //get comments for article (doesn't work without that if)
    fetch(`/articles/${article}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (comments) {
          return setComments(data.comments);
        }
      })
      .catch((err) => console.error(err));
  }, [comments]);

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

  const editComment = (id) => {
    fetch(`/articles/${article}/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edit),
    })
      .then((response) => {
        response.json();
      })
      .catch((error) => console.error(error));
  };

  const deleteComment = (id) => {
    fetch(`/articles/${article}/comments/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error(err));
  };

  const getComment = (id) => {
    console.log("id: ", id);
    fetch(`/articles/${article}/comments/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.text);
        setEdit({ ...edit, text: res.text });
      })
      .catch((err) => console.error(err));
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
            <th>Comment Date: </th>
            <th>Comment Text: </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {comments
            .map((comment) => {
              return (
                <tr key={comment._id}>
                  <td style={{ verticalAlign: "middle" }}>
                    {moment(comment.createdAt).format("M-D-YY, h:mm a")}
                  </td>
                  <td style={{ width: "100%", verticalAlign: "middle" }}>
                    <div style={{ whiteSpace: "pre-wrap" }}>{comment.text}</div>
                    <p
                      style={{
                        marginTop: "15px",
                        fontSize: "10px",
                        fontStyle: "italic",
                      }}
                    >
                      <b>Edited at: </b>
                      {moment(comment.updatedAt).format("M-D-YY, h:mm a")}
                    </p>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{ margin: "5px" }}
                      onClick={() => {
                        setClickedComment(comment._id);
                        setDeleteToggle(true);
                        handleShow();
                      }}
                      variant="danger"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      style={{ margin: "5px" }}
                      onClick={() => {
                        setClickedComment(comment._id);
                        setDeleteToggle(false);
                        handleShow();
                        getComment(comment._id);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {deleteToggle === true ? "Warning" : "Edit"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteToggle === true ? (
            "Are you sure you want to delete the comment? This will remove it PERMANENTLY from the blog."
          ) : (
            <Form>
              <FormControl
                defaultValue={edit.text}
                as="textarea"
                rows="3"
                required={true}
                onChange={(e) => setEdit({ ...edit, text: e.target.value })}
              />
              <Button
                style={{ marginTop: "10px" }}
                type="submit"
                onClick={() => editComment(clickedComment)}
              >
                Edit
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ marginRight: "15px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          {deleteToggle === true && (
            <Button
              variant="danger"
              onClick={() => {
                deleteComment(clickedComment);
                handleClose();
              }}
            >
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comments;
