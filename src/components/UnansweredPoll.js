import React, { Component } from "react";
import { connect } from "react-redux";
import { savePollAnswer } from "../actions/shared";

class UnansweredPoll extends Component {
  state = {
    option: "select",
  };

  handleChange = (e) => {
    const option = e.target.value;
    this.setState(() => ({
      option,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const option = this.state.option;
    console.log(option);
    const { authedUser, id } =this.props;
    this.props.dispatch(savePollAnswer({
      authedUser,
      qid:id,
      answer:option
     }))
  }

  render() {
    console.log(this.props);
    const { name, avatar, option1, option2 } = this.props.poll;
    return (
      <div className="Box2">
        <h3>{name}</h3>
        <select value={this.state.option} onChange={this.handleChange}>
          <option disabled value="select" hidden>
            Select your option
          </option>
          <option value="optionOne">{option1}</option>
          <option value="optionTwo">{option2}</option>
        </select>
        <button type="submit"
          disabled={this.state.option === "select"}
          onClick={this.handleSubmit}>
          Sign In
        </button>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const option1 = questions[id].optionOne.text;
  const option2 = questions[id].optionTwo.text;
  return {
    authedUser,
    poll: {
      name,
      avatar,
      option1,
      option2,
    },
  };
}

export default connect(mapStateToProps)(UnansweredPoll);
