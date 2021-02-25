import React, { Component } from "react";
import { connect } from "react-redux";

class PollBrief extends Component {
  render() {
    console.log(this.props);
    return <div>{this.props.id}</div>;
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const name = users[authedUser].name;
  const avatar = users[authedUser].avatarURL;
  const timestamp = questions[id].timestamp;
  const briefOption = questions[id].optionOne.text;
  const pollBrief = {
    id: {
      name,
      avatar,
      timestamp,
      briefOption,
    },
  };

  return {
    pollBrief,
  };
}

export default connect(mapStateToProps)(PollBrief);
