import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";

class AnsweredPoll extends Component {
  render() {
    const { poll } = this.props;
    console.log(this.props);
    const vote = poll.totalVotes === 1 ? " vote" : " votes";

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
                <Card border="success" className="yourAnswer">
                  <Card.Body>
                    <Card.Title>
                      Would you rather {poll.userAnswer}?
                      <Badge pill variant="warning" className="indicator">
                        Your
                        <br />
                        Vote
                      </Badge>
                    </Card.Title>

                    <Card.Text>{poll.userVotePercentage}% is your votes Percentage.</Card.Text>
                    <ProgressBar>
                      <ProgressBar
                        variant="info"
                        now={poll.userVotePercentage}
                        label={
                          poll.userVotePercentage >= 10
                            ? `${poll.userVotePercentage}%`
                            : ""
                        }
                      />
                      {poll.userVotePercentage < 10 && (
                        <ProgressBar
                          now={100.0 - poll.userVotePercentage}
                          label={`${poll.userVotePercentage}%`}
                          className="custompb"
                        />
                      )}
                    </ProgressBar>
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
                    <Card.Text>
                      {poll.otherVotesPercentage}% is the other votes Percentage.
                    </Card.Text>
                    <ProgressBar>
                      <ProgressBar
                        variant="info"
                        now={poll.otherVotesPercentage}
                        label={
                          poll.otherVotesPercentage >= 10
                            ? `${poll.otherVotesPercentage}%`
                            : ""
                        }
                      />
                      {poll.otherVotesPercentage < 10 && (
                        <ProgressBar
                          now={100.0 - poll.otherVotesPercentage}
                          label={`${poll.otherVotesPercentage}%`}
                          className="custompb"
                        />
                      )}
                    </ProgressBar>
                    <Card.Text>
                      {poll.otherVotesNum} out of {poll.totalVotes} {vote}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardColumns>
            </div>
          </Card.Body>
        </Card>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const options = ["optionOne", "optionTwo"];
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const userOption = users[authedUser].answers[id];
  const otherOptionFilter = questions[id][options.filter((option) => option !== userOption)];
  const userVotesNum =
    questions[id][userOption].votes.length;
  const otherVotesNum = otherOptionFilter.votes.length;
  const totalVotes = userVotesNum + otherVotesNum;
  const userAnswer = questions[id][userOption].text;
  const otherOption = otherOptionFilter.text;
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
