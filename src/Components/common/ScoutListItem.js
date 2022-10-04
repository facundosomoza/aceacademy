import React, { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import matchImage from "../Images/match.png";
import noMatchImage from "../Images/no_match.png";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function ScoutListItem({ user, app }) {
  const [url, setUrl] = useState("");
  const handleMatch = (currentMatch) => {
    const newMatch = !currentMatch;

    console.log("current match", currentMatch, "new match", newMatch);
  };

  const getImageProfile = async (userId) => {
    const storage = getStorage(app);

    const profileImageRef = ref(storage, user.id);

    const profileImageUrl = await getDownloadURL(profileImageRef);

    console.log(profileImageUrl);

    setUrl(profileImageUrl);
  };

  useEffect(() => {
    getImageProfile();
  }, []);

  return (
    <Row className="mb-3">
      <Col xs={1}>
        <img
          src={url}
          alt={`Image profile for user ${user.name} ${user.surname}`}
          className="profile-image-list"
        />
      </Col>
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
          onClick={() => handleMatch(user.match)}
        />
      </Col>
    </Row>
  );
}
