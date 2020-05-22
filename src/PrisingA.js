import React, { Component } from "react";
import { AUTH_TOKEN, USER_ID } from "./constants";

class PrisingA extends Component {
  render() {
    return (
      <div className={"form"}>
        <div className={"auth"}>
          <div className={"logout"}>
            <button
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                localStorage.removeItem(USER_ID);
                this.props.history.push(`/sign-in`);
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PrisingA;
