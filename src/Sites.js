import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { USER_ID, AUTH_TOKEN } from "./constants";

class Sites extends Component {
  render() {
    const userQuery = gql`
  query {
  me{
  username
  }
  user(id:${localStorage.getItem(USER_ID)}){
    sites {
    id
      title
      url
    }
    }
  }
`;
    return (
      <Query query={userQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          if (!data) {
            return <div>data is undefined</div>;
          }

          if (!data.user.sites) {
            return <div>received no sites</div>;
          }

          return (
            <div>
              <nav>
                <div className={"username"}> {data.me.username}</div>
                <button
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    localStorage.removeItem(USER_ID);
                    this.props.history.push(`/sign-in`);
                  }}
                >
                  Log out
                </button>
              </nav>
              <div className={"sites"}>
                <div className={"title"}>Sites</div>
                {data.user.sites.map((site) => (
                  <div key={site.id} className={"site"}>
                    <div className={"site-name"}>{site.title}</div>
                    <div className={"site-url"}>{site.url}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Sites;
