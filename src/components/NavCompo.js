import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAuthedUser } from "../actions/authedUser";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

function NavCompo(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.dispatch(deleteAuthedUser());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Would You Rather...</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav variant="pills" className="mr-auto">
          <Nav.Link as={NavLink} to="/" exact>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add">
            New Question
          </Nav.Link>
          <Nav.Link as={NavLink} to="/leaderboard">
            Leader Board
          </Nav.Link>
        </Nav>

        <Navbar.Text>
          {props.authedUser !== null ? (
            <div className="showAfterLogin">
              <div className="hiUser">Hi {props.authedUser}</div>
              <Image
                src={props.avatar}
                alt={props.authedUser}
                roundedCircle
                className="navAvatar"
              />
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
