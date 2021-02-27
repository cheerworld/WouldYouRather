import React, { Component } from "react";
import { connect } from "react-redux";
import Poll from "./Poll";
import { Route, Link, withRouter } from "react-router-dom";

class PollBrief extends Component {
  state = {
    showComponent: false,
  };

  handleClick = (e) => {
    e.preventDefault();

    //go to "questions/:question_id" Poll page
    this.setState(() => ({
      showComponent: true,
    }));
    this.props.history.push(`questions/${this.props.id}`)
  };

  render() {
    console.log(this.props);
    const { pollBrief } = this.props;
    if (this.state.showComponent === true) {
      return (<Poll id={this.props.id} />);
    }
    return (
      <div>
        <div>
          <h4>{pollBrief.name} asks:</h4>
          <h4>Would you rather</h4>
          <p>...{pollBrief.briefOption}...</p>
          <Link to={`questions/${this.props.id}`}>
            <button
              type="submit"
              value={this.props.id}
              onClick={this.handleClick}
            >
              View Poll
            </button>
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

export default withRouter(connect(mapStateToProps)(PollBrief));
