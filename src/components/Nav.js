import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAuthedUser } from "../actions/authedUser";

function Nav (props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.dispatch(deleteAuthedUser())
  }

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active" >
             Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active" >
             New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active" >
             Leader Board
          </NavLink>
        </li>
        {props.authedUser !== null
          ? (
            <div className="showAfterLogin">
            <li>Hi {props.authedUser}</li>
            <li>{props.avatar}</li>
            <button onClick={handleClick}>Logout</button>
            </div>
          )
          :null}
      </ul>
    </nav>
  )
}

function mapStateToProps({users, authedUser}) {
  return {
    authedUser,
    avatar: authedUser? users[authedUser].avatarURL : null
  }
}

export default connect(mapStateToProps)(Nav);
