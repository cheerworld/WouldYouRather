import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../CSS/Home.css";

class PollBrief extends Component {
  render() {
    console.log(this.props);
    const { pollBrief, id } = this.props;

    return (
        <Card className="Box1 poll">
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
              <Card.Title as="h4">Would you rather</Card.Title>
              <Card.Text className="cardText">
                ...{pollBrief.briefOption}...
              </Card.Text>
                <Button as={Link} to={`questions/${id}`} variant="outline-info" type="submit" block>
                  View Poll
                </Button>
            </div>
          </Card.Body>
        </Card>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const briefOption = questions[id].optionOne.text.substring(0, 25);
  const pollBrief = {
    name,
    avatar,
    briefOption,
  };

  return {
    pollBrief,
  };
}

export default connect(mapStateToProps)(PollBrief);
