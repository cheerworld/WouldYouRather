import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from 'react-bootstrap/Badge'

class AnsweredPoll extends Component {
  render() {
    const { poll } = this.props;
    console.log(this.props);
    const vote = poll.totalVotes === 1 ? " vote" : " votes";

    return (
      <div>
        <Card border="info" style={{ border: "2px solid" }}>
          <Card.Body className="pollBrief">
            <div className="leftCenter">
              <Card.Title>Asked by {poll.name}</Card.Title>
              <Card.Img
                variant="bottom"
                src={poll.avatar}
                alt={poll.name}
                className="pollAvatar"
              />
            </div>
            <div>
              <h5>Results:</h5>
              <CardColumns className="right">
                <Card border="success" className="yourAnswer">
                  <Card.Body>
                    <Card.Title>Would you rather {poll.userAnswer}?
                    <Badge pill variant="warning" className="indicator">
                     Your
                     <br/>
                     Vote
                    </Badge>
                    </Card.Title>

                    <p>{poll.userVotePercentage} is your votes Percentage.</p>
                    <ProgressBar
                      variant="info"
                      now={poll.userVotePercentage}
                      label={`${poll.userVotePercentage}%`}
                    />
                    <Card.Text>
                      {poll.userVotesNum} out of {poll.totalVotes} {vote}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Would you rather {poll.otherOption}?
                    </Card.Title>
                    <p>
                      {poll.otherVotesPercentage} is the other votes Percentage.
                    </p>
                    <ProgressBar
                      variant="info"
                      now={poll.otherVotesPercentage}
                      label={`${poll.otherVotesPercentage}%`}
                    />
                    <Card.Text>
                      {poll.otherVotesNum} out of {poll.totalVotes} {vote}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardColumns>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const options = ["optionOne", "optionTwo"];
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const userOption = users[authedUser].answers[id];
  const userVotesNum =
    questions[id][users[authedUser].answers[id]].votes.length;
  const otherVotesNum =
    questions[id][options.filter((option) => option !== userOption)].votes
      .length;
  const totalVotes = userVotesNum + otherVotesNum;

  const userAnswer = questions[id][users[authedUser].answers[id]].text;
  const otherOption =
    questions[id][options.filter((option) => option !== userOption)].text;
  const userVotePercentage = Math.round((userVotesNum / totalVotes) * 100);
  const otherVotesPercentage = Math.round((otherVotesNum / totalVotes) * 100);
  return {
    poll: {
      name,
      avatar,
      userAnswer,
      otherOption,
      userVotesNum,
      otherVotesNum,
      totalVotes,
      userVotePercentage,
      otherVotesPercentage,
    },
  };
}
export default connect(mapStateToProps)(AnsweredPoll);
