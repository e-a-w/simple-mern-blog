import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Article from "./components/articles/Article";
import Articles from "./components/articles/Articles";
import ArticleForm from "./components/articles/ArticleForm";
import PageNavbar from "./components/navbar/PageNavbar";
import Search from "./components/search/Search";
import Manage from "./components/articles/Manage";

const App = () => {
  return (
    <BrowserRouter>
      <PageNavbar />
      <Container style={{ marginTop: "100px" }}>
        <Switch>
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/new" component={ArticleForm} />
          <Route
            exact
            path="/articles/:articleId/edit"
            component={ArticleForm}
          />
          <Route exact path="/articles/:articleId" component={Article} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/manage" component={Manage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
