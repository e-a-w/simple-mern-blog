import React from "react";
import { Jumbotron, Card, Button } from "react-bootstrap";

const Home = ({ history }) => {
  const card = {
    margin: "20px",
  };

  return (
    <>
      <Jumbotron>
        <h1> Welcome to the Blog!</h1>
        <p>Where would you like to start?</p>
      </Jumbotron>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Card style={card}>
          <Card.Body>
            <Button
              variant="secondary"
              onClick={() => history.push("/articles/new")}
            >
              Create an Article
            </Button>
          </Card.Body>
        </Card>
        <Card style={card}>
          <Card.Body>
            <Button
              variant="secondary"
              onClick={() => history.push("/articles")}
            >
              View All Articles
            </Button>
          </Card.Body>
        </Card>
        <Card style={card}>
          <Card.Body>
            <Button variant="secondary" onClick={() => history.push("/search")}>
              Search for Articles
            </Button>
          </Card.Body>
        </Card>
        <Card style={card}>
          <Card.Body>
            <Button variant="secondary" onClick={() => history.push("/manage")}>
              Manage Articles
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Home;
