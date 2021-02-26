import React, { Component } from "react";
import { connect } from "react-redux";

import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn";
import PollList from "./PollList";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="App">
        {this.props.authedUser === null
          ? <SignIn />
          : <PollList />}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(App);
