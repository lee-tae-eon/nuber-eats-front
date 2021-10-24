import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { meQuery } from "../__generated__/meQuery";
import Restaurants from "../pages/client/restaurants";

import { isLoggedInVar } from "../apollo";

const ClientRouter = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">loading...</span>
      </div>
    );
  }

  const onClick = () => {
    isLoggedInVar(false);
  };

  return (
    <Router>
      <Switch>
        {data.me.role === "Client" && ClientRouter}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
