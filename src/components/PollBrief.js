import React, { Component } from "react";
import { connect } from "react-redux";

class PollBrief extends Component {
  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value)

  };

  render() {
    console.log(this.props);
    const { pollBrief } = this.props;
    return (
      <div>
        {this.props.id}
        <h4>{pollBrief.name} asks:</h4>
        <h4>Would you rather</h4>
        <p>...{pollBrief.briefOption}...</p>
        <button type="submit" value={this.props.id} onClick={this.handleClick}>
          View Poll
        </button>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const timestamp = questions[id].timestamp;
  const briefOption = questions[id].optionOne.text;
  const pollBrief = {
    name,
    avatar,
    timestamp,
    briefOption,
  };

  return {
    pollBrief,
    user: Object.keys(users[authedUser].answers),
  };
}

export default connect(mapStateToProps)(PollBrief);
