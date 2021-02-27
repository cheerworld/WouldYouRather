import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn";
import PollList from "./PollList";
import Poll from "./Poll";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {this.props.authedUser === null ? (
              <SignIn />
            ) : (
              <Route path="/" exact component={PollList} />
            )}
            <Route path="/questions/:question_id" component={Poll} />
          </Switch>
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
