import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class SignIn extends Component {
  state = {
    value: "select",
  };

  handleChange = (e) => {
    const value = e.target.value;

    this.setState(() => ({
      value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const authedUser = this.state.value;
    const { dispatch } = this.props;
    this.setState({ value: "select" });

    dispatch(setAuthedUser(authedUser));
  };

  render() {
    const users = this.props.usersId;
    console.log(users);
    return (
      <div className="signInBox">
        <form className="formBox" onSubmit={this.handleSubmit}>
          <h3>Welcome to Would You Rather App</h3>
          <p>Please sign in to continue</p>
          <h2>Sign in</h2>
          <select value={this.state.value} onChange={this.handleChange}>
            <option disabled value="select" hidden>
              Select user
            </option>
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
          <button type="submit" disabled={this.state.value === "select"}>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    usersId: Object.keys(users),
  };
}

export default connect(mapStateToProps)(SignIn);
