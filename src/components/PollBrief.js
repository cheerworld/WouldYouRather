import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class PollBrief extends Component {
  render() {
    console.log(this.props);
    const { pollBrief } = this.props;

    return (
      <div className="Box1 poll">
        <Card>
          <Card.Header as="h4">{pollBrief.name} asks:</Card.Header>
          <Card.Body className="pollBrief">
            <div className="left">
              <Image
                src={pollBrief.avatar}
                alt={pollBrief.name}
                thumbnail
                className="pollAvatar"
              />
            </div>
            <div className="right">
              <Card.Title>Would you rather</Card.Title>
              <Card.Text className="cardText">
                ...{pollBrief.briefOption}...
              </Card.Text>
              <Link to={`questions/${this.props.id}`}>
                <Button variant="success" type="submit">
                  View Poll
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const timestamp = questions[id].timestamp;
  const briefOption = questions[id].optionOne.text.substring(0, 25);
  const pollBrief = {
    name,
    avatar,
    timestamp,
    briefOption,
  };

  return {
    pollBrief,
  };
}

export default connect(mapStateToProps)(PollBrief);
