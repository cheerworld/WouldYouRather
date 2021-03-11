import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";

class UserScore extends Component {
  render() {
    //console.log(this.props);
    const { user } = this.props;
    return (
      <Card border="info" className="scoreDetail">
        <Card.Body className="row">
          <Card.Img src={user.avatar} alt={user.name} className="scoreAvatar" />
          <div className="userScoreColumn middle">
            <Card.Title as="h3">{user.name}</Card.Title>
            <div>
              <div className="space topBorder">
                <Card.Text>Answered Questions</Card.Text>
                <Card.Text>{user.answeredQQ}</Card.Text>
              </div>
              <div className="space">
                <Card.Text>Created Questions</Card.Text>
                <Card.Text>{user.createdQQ}</Card.Text>
              </div>
            </div>
          </div>
          <Card className="userScoreColumn">
            <Card.Header>Score</Card.Header>
            <Card.Body className="scoreCircle">
              <Badge
                pill
                variant="warning"
                className={user.score >= 10 ? "above10" : "scoreSize"}
              >
                {user.score}
              </Badge>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const userId = users[id];
  const name = userId.name;
  const avatar = userId.avatarURL;
  const answeredQQ = Object.keys(userId.answers).length;
  const createdQQ = userId.questions.length;
  const score = answeredQQ + createdQQ;
  return {
    user: {
      name,
      avatar,
      answeredQQ,
      createdQQ,
      score,
    },
  };
}

UserScore.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(UserScore);
