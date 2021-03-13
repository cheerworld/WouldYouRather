import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";

class AnsweredPollOption extends Component {
  render() {
    const {
      optionText,
      votesNum,
      totalVotes,
      votePercentage,
      userChoice,
      option_id,
    } = this.props.poll;
    const vote = totalVotes === 1 ? " vote" : " votes";
    return (
      <Card
        border={userChoice === option_id ? "success" : ""}
        className={userChoice === option_id ? "yourAnswer" : ""}
      >
        <Card.Body>
          <Card.Title>
            Would you rather {optionText}?
            {userChoice === option_id ? (
              <Badge pill variant="warning" className="indicator">
                Your
                <br />
                Vote
              </Badge>
            ) : null}
          </Card.Title>

          <Card.Text>{votePercentage}% is your votes Percentage.</Card.Text>
          <ProgressBar>
            <ProgressBar
              variant="info"
              now={votePercentage}
              label={votePercentage >= 10 ? `${votePercentage}%` : ""}
            />
            {votePercentage < 10 && (
              <ProgressBar
                now={100.0 - votePercentage}
                label={`${votePercentage}%`}
                className="custompb"
              />
            )}
          </ProgressBar>
          <Card.Text>
            {votesNum} out of {totalVotes} {vote}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id, option_id }) {
  const optionText = questions[id][option_id].text;
  const votesNum = questions[id][option_id].votes.length;
  const totalVotes =
    questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length;
  const votePercentage = Math.round((votesNum / totalVotes) * 100);
  const userChoice = users[authedUser].answers[id];
  const poll = {
    option_id,
    optionText,
    votesNum,
    totalVotes,
    votePercentage,
    userChoice,
  };

  return {
    poll,
  };
}

AnsweredPollOption.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(AnsweredPollOption);
