import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import PropTypes from "prop-types";
import AnsweredPollOption from "./AnsweredPollOption";

class AnsweredPoll extends Component {
  render() {
    const { poll } = this.props;
    //console.log(this.props);
    return (
      <Card border="info" style={{ border: "2px solid" }}>
        <Card.Header as="h4">Asked by {poll.name}</Card.Header>
        <Card.Body className="pollBrief">
          <div className="leftCenter">
            <Card.Img
              src={poll.avatar}
              alt={poll.name}
              className="pollAvatar"
            />
          </div>
          <div>
            <CardColumns className="right">
              <h5>Results:</h5>
              <AnsweredPollOption id={poll.id} option_id="optionOne" />
              <AnsweredPollOption id={poll.id} option_id="optionTwo" />
            </CardColumns>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  return {
    poll: {
      id,
      name,
      avatar,
    },
  };
}

AnsweredPoll.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(AnsweredPoll);
