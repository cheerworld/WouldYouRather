import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn";
import PollList from "./PollList";
import Poll from "./Poll";
import LeaderBoard from "./LeaderBoard";
import NewPoll from "./NewPoll";
import NavCompo from "./NavCompo";
import Container from "react-bootstrap/Container";
import LoadingBar from "react-redux-loading";
import ErrorPage404 from "./ErrorPage404";
import "../CSS/App.css";
import PropTypes from "prop-types";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Container>
          <LoadingBar />
          <div className="App">
            <NavCompo />
            {this.props.authedUser === null ? (
              <SignIn />
            ) : (
              <div>
                <Switch>
                  <Route path="/" exact component={PollList} />
                  <Route path="/add" exact component={NewPoll} />
                  <Route path="/leaderboard" exact component={LeaderBoard} />
                  <Route
                    path="/questions/:question_id"
                    exact
                    component={Poll}
                  />
                  <Route component={ErrorPage404} />
                </Switch>
              </div>
            )}
            <footer>
              <p className="footerP">
                <span role="img" aria-label="Tulip">
                  🌷{" "}
                </span>
                Made by Yuguo Zhao
                <span role="img" aria-label="Hibiscus">
                  {" "}
                  🌺
                </span>
              </p>
            </footer>
          </div>
        </Container>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

App.propTypes = {
  authedUser: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(App);
