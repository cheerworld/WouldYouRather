import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn";
import PollList from "./PollList";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
      <div className="App">
        {this.props.authedUser === null
          ? <SignIn />
          : <Route path="/" exact component={PollList} />}
      </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(App);
