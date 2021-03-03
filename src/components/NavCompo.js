import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAuthedUser } from "../actions/authedUser";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'

function NavCompo(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.dispatch(deleteAuthedUser());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Would You Rather...</Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/add">New Question</Nav.Link>
        <Nav.Link href="/leaderboard">Leader Board</Nav.Link>
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {props.authedUser !== null ? (
            <div className="showAfterLogin">
              <li>Hi {props.authedUser}</li>
              <li>{props.avatar}</li>
              <button onClick={handleClick}>Logout</button>
            </div>
          ) : null}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    avatar: authedUser ? users[authedUser].avatarURL : null,
  };
}

export default connect(mapStateToProps)(NavCompo);
/*
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
*/
