import React, { Component } from "react";
import { connect } from "react-redux";

class SignIn extends Component {
  render () {
    return (
      <div>
      <form>
       <h3>Welcome to Would You Rather App</h3>
       <p>Please sign in to continue</p>
       <h2>Sign in</h2>
       <select>
         <option></option>
       </select>
       </form>
      </div>
    )
  }
}

function mapStateToProps() {

}

export default SignIn;
