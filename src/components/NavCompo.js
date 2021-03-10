import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAuthedUser } from "../actions/authedUser";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "../CSS/nav.css";
import PropTypes from "prop-types";

function NavCompo(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.dispatch(deleteAuthedUser());
  };

  return (
    <Navbar bg="light" expand="lg" className="nav">
      <Navbar.Brand>Would You Rather...</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav variant="pills" className="mr-auto">
          <Nav.Link as={NavLink} to="/" exact activeClassName="active-nav-link">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add" activeClassName="active-nav-link">
            New Question
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/leaderboard"
            activeClassName="active-nav-link"
          >
            Leader Board
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/doesNotExist"
            activeClassName="active-nav-link"
          >
            404 Error
          </Nav.Link>
        </Nav>

        <Navbar.Text>
          {props.authedUser !== null ? (
            <div className="showAfterLogin">
              <div className="hiUser">Hi, {props.userName}</div>
              <Image
                src={props.avatar}
                alt={props.authedUser}
                roundedCircle
                className="navAvatar"
              />
              <Button variant="outline-warning" onClick={handleClick}>
                Logout
              </Button>
            </div>
          ) : null}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps({ users, authedUser }) {
  const userName = authedUser ? users[authedUser].name : null;
  return {
    authedUser,
    userName,
    avatar: authedUser ? users[authedUser].avatarURL : null,
  };
}

NavCompo.propTypes = {
  authedUser: PropTypes.string,
  userName: PropTypes.string,
  avatar: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}


export default connect(mapStateToProps)(NavCompo);
