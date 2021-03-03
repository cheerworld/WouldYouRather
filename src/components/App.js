import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn";
import PollList from "./PollList";
import Poll from "./Poll";
import LeaderBoard from "./LeaderBoard";
import NewPoll from "./NewPoll";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <hr />
          {this.props.authedUser === null ? (
            <SignIn />
          ) : (
            <div>
              <Switch>
                <Route path="/" exact component={PollList} />
                <Route path="/add" component={NewPoll} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/questions/:question_id" component={Poll} />
              </Switch>
            </div>
          )}
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
