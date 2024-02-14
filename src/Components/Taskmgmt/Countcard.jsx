import React from "react";
import Card from "react-bootstrap/Card";

const CountCard = ({ title, count }) => {
  return (
    <Card style={{ alignSelf: "flex-start", width: "95%" }} > 
      <Card.Body>
        <Card.Title className="lead">{title}</Card.Title>
        <Card.Title as="h2">{count}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CountCard;
