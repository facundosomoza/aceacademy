import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import matchImage from "../Images/match.png";
import noMatchImage from "../Images/no_match.png";

export default function PlayerListItem({ user, app }) {
  return (
    <Row className="mb-3">
      <Col xs={10}>
        <Row>
          <Col>
            {user.name} {user.surname}
          </Col>
        </Row>
        <Row>
          <Col>{user.email}</Col>
        </Row>
        <Row>
          <Col>{user.mobileNumber}</Col>
        </Row>
      </Col>
      <Col xs={1}>
        <img
          className="match-logo"
          src={user.match ? matchImage : noMatchImage}
          alt="match"
        />
      </Col>
    </Row>
  );
}
