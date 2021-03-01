import React, { Component } from "react";
import { connect } from "react-redux";
import { addPollToStore } from "../actions/shared";

class NewPoll extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props);
    const { optionOne, optionTwo } = this.state;
    const { authedUser, dispatch, history } = this.props;
    dispatch(
      addPollToStore({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser,
      })
    );
    history.push("/");
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    const option1Left = 70 - optionOne.length;
    const option2Left = 70 - optionTwo.length;
    return (
      <div>
        <h3>Create New Question</h3>
        <p>Complete the question:</p>
        <h4>Would you rather...</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="optionOne"
            placeholder="Enter option one text here"
            value={optionOne}
            onChange={this.handleChange}
            maxLength={70}
          />
          {option1Left <= 10 && (
            <div className="option-length">{option1Left}</div>
          )}
          <h4>Or</h4>
          <input
            type="text"
            name="optionTwo"
            placeholder="Enter option two text here"
            value={optionTwo}
            onChange={this.handleChange}
            maxLength={70}
          />
          {option2Left <= 10 && (
            <div className="option-length">{option2Left}</div>
          )}
          <button
            className="btn"
            type="submit"
            disabled={optionOne === "" || optionTwo === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NewPoll);
