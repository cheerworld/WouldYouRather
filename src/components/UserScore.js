import React, { Component } from "react";
import { connect } from "react-redux";

class UserScore extends Component {
  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <div className="scoreDetail">
        <h4>{user.avatar}</h4>
        <div className="userScoreColumn">
          <h3>{user.name}</h3>
          <p>Answered Questions: {user.answeredQQ}</p>
          <p>Created Questions: {user.createdQQ}</p>
        </div>
        <h3>Score: {user.score}</h3>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const userId = users[id];
  const name = userId.name;
  const avatar = userId.avatarURL;
  const answeredQQ = Object.keys(userId.answers).length;
  const createdQQ = userId.questions.length;
  const score = answeredQQ + createdQQ;
  return {
    user: {
      name,
      avatar,
      answeredQQ,
      createdQQ,
      score,
    },
  };
}

export default connect(mapStateToProps)(UserScore);
