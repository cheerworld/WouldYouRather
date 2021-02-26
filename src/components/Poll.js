import React, { Component } from "react";
import { connect } from "react-redux";

class Poll extends Component {
  render() {
    console.log(this.props)
    const {poll, user, userVote,dispatch } = this.props;
    return (
      <div>
       {this.props.userVote!==null
        ? (
          <div>
            <h3>Asked by {poll.name}</h3>
            <p>{poll.avatar}</p>
            <p>Would you rather {poll.option1}?</p>
            <p>{poll.option1Votes} out of {poll.totalVotes} votes</p>
            <p>Would you rather {poll.option2}?</p>
            <p>{poll.option2Votes} out of {poll.totalVotes} votes</p>
          </div>
        )
        :<p>No result yet</p>}
      </div>
    )
  }
}


function mapStateToProps({users, questions, authedUser}, {id}) {
  const options = ["optionOne", "optionTwo"];
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const option1 = questions[id].optionOne.text;
  const option2 = questions[id].optionTwo.text;
  const option1Votes = questions[id].optionOne.votes.length;
  const option2Votes = questions[id].optionTwo.votes.length;
  const totalVotes = option1Votes + option2Votes;
  const user = Object.keys(users[authedUser].answers);
  const userVote = user.includes(id)
    ? users[authedUser].answers[id]
    : null;

  return {
    user,
    poll: {
      name,
      avatar,
      option1,
      option2,
      option1Votes,
      option2Votes,
      totalVotes,
    },
    userVote,
  };
}

export default connect(mapStateToProps)(Poll);
