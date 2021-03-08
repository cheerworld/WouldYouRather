import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ErrorPage404(props) {
  return (
    <Card>
      <Card.Header as="h1">Error Page 404</Card.Header>
      <Card.Body>
        <Card.Title>
          Page Not Found, Please click thie button below to go back.
        </Card.Title>
        <Link to="/">
          <Button>Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ErrorPage404;
