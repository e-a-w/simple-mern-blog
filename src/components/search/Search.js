import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";

const Search = ({ history }) => {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      fetch(`/articles/search/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
        })
        .catch((err) => console.error(err));
    }
  }, [searchTerm]);

  return (
    <>
      <Jumbotron>
        <h1>Search</h1>
        <p>
          Here you can search for articles. It will search both text and title
          for you.
        </p>
      </Jumbotron>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
            type="text"
            placeholder="Search for articles..."
          />
        </Form.Group>
      </Form>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "0 auto" }}>
        {result.length > 0 &&
          searchTerm.length > 0 &&
          result.map((article) => {
            return (
              <Card
                style={{ width: "18rem", margin: "10px 20px" }}
                key={article._id}
              >
                <Card.Header>
                  <h5>{article.title}</h5>
                </Card.Header>
                <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                  {article.text.slice(0, 100)}
                  {article.text.length > 100 && "..."}
                </Card.Body>
                <Card.Footer>
                  <Button
                    onClick={() => history.push(`/articles/${article._id}`)}
                  >
                    Read More!
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default Search;
