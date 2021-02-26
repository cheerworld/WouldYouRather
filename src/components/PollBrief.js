import React, { Component } from "react";
import { connect } from "react-redux";
import Poll from "./Poll";

class PollBrief extends Component {
  handleClick = (e) => {
    e.preventDefault();

    //go to "questions/:question_id" Poll page

  };

  render() {
    console.log(this.props);
    const { pollBrief } = this.props;
    return (
      <div>
        <div>
          <h4>{pollBrief.name} asks:</h4>
          <h4>Would you rather</h4>
          <p>...{pollBrief.briefOption}...</p>
          <button
            type="submit"
            value={this.props.id}
            onClick={this.handleClick}
          >
            View Poll
          </button>
        </div>
        <Poll id={this.props.id}/>
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
