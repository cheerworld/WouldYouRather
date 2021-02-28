import React, { Component } from "react";
import { connect } from "react-redux";
import AnsweredPoll from "./AnsweredPoll";
import UnansweredPoll from "./UnansweredPoll";

class Poll extends Component {
  render() {
    console.log(this.props);
    const { userVoteOrNot, id } = this.props;
    return (
      <div className="Box1">
        {userVoteOrNot ? <AnsweredPoll id={id} /> : <UnansweredPoll id={id} />}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, props) {
  console.log(props);
  const id = props.match.params.question_id;
  const userAnsweredPoll = Object.keys(users[authedUser].answers);
  const userVoteOrNot = userAnsweredPoll.includes(id);

  return {
    id,
    userVoteOrNot,
  };
}

export default connect(mapStateToProps)(Poll);
