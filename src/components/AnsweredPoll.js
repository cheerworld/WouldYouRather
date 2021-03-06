import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

class AnsweredPoll extends Component {
  render() {
    const { poll } = this.props;
    console.log(this.props);
    return (
      <div >
       <Card border="info" style={{ border: "2px solid" }}>
        <Card.Body className="pollBrief">
        <div className="left">
        <Card.Title>Asked by {poll.name}</Card.Title>
        <Card.Img variant="bottom" src={poll.avatar} alt={poll.name} className="pollAvatar"/>
        </div>
        <div className="right">
        <h4>Results:</h4>
        <p>Your Choice: Would you rather {poll.userAnswer}?</p>
        <p>{poll.userVotePercentage} is your votes Percentage.</p>
        <p>
          {poll.userVotesNum} out of {poll.totalVotes} votes
        </p>
        <p>Would you rather {poll.otherOption}?</p>
        <p>{poll.otherVotesPercentage} is othter votes Percentage.</p>
        <p>
          {poll.otherVotesNum} out of {poll.totalVotes} votes
        </p>
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
  const userVotePercentage = Math.round((userVotesNum/totalVotes)*100);
  const otherVotesPercentage = Math.round((otherVotesNum/totalVotes)*100);
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
