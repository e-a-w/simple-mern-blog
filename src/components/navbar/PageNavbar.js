import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const PageNavbar = () => {
  return (
    <Navbar
      style={{ width: "100vw" }}
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Navbar.Brand href="#home">MERN Blog</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/articles">All Articles</Nav.Link>
          <Nav.Link href="/articles/new">Create Article</Nav.Link>
          <Nav.Link href="/manage">Manage Articles</Nav.Link>
          <Nav.Link href="/search">Search for Articles</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PageNavbar;
