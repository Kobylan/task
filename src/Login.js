import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { AUTH_TOKEN, USER_ID } from "./constants";

const loginMutation = gql`
  mutation($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
        id
        email
        confirmed
      }
    }
  }
`;

class Login extends Component {
  state = {
    input: {
      identifier: "",
      password: "",
    },
  };
  _confirm = async (data) => {
    const { jwt, user } = data.login;
    this._saveUserData(jwt, user);
    this.props.history.push(`/sites`);
  };
  _saveUserData = async (token, user, username) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_ID, user.id);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      input: {
        ...this.state.input,
        [name]: value,
      },
    });
  };
  render() {
    const { identifier, password } = this.state.input;
    return (
      <Mutation
        mutation={loginMutation}
        variables={this.state}
        onCompleted={(data) => this._confirm(data)}
        onError={() => alert("invalid username or password")}
      >
        {(mutate) => (
          <div className={"form"}>
            <div className={"auth"}>
              <div className={"identifier"}>
                <input
                  type={"text"}
                  name={"identifier"}
                  placeholder={"identifier"}
                  value={identifier}
                  onChange={this.handleChange}
                />
              </div>
              <div className={"password"}>
                <input
                  type={"password"}
                  name={"password"}
                  placeholder={"password"}
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className={"login"}>
                <button onClick={mutate}>Login</button>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
