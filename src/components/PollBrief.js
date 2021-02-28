import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PollBrief extends Component {
  render() {
    console.log(this.props);
    const { pollBrief } = this.props;

    return (
      <div>
        <div>
          <h4>{pollBrief.name} asks:</h4>
          <h4>Would you rather</h4>
          <p>...{pollBrief.briefOption}...</p>
          <Link to={`questions/${this.props.id}`}>
            <button type="submit">View Poll</button>
          </Link>
        </div>
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
  };
}

export default connect(mapStateToProps)(PollBrief);
