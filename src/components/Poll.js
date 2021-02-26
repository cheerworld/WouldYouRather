import React, { Component } from "react";
import { connect } from "react-redux";
import AnsweredPoll from "./AnsweredPoll";
import UnansweredPoll from "./UnansweredPoll";

class Poll extends Component {
  render() {
    console.log(this.props);
    const { userVote, id } = this.props;
    return (
      <div>
        {userVote ? <AnsweredPoll id={id} /> : <UnansweredPoll id={id} />}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const user = Object.keys(users[authedUser].answers);
  const userVote = user.includes(id);

  return {
    id,
    user,
    userVote,
  };
}

export default connect(mapStateToProps)(Poll);
