// Lib
import { findByTestId, render, screen } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
// Components
import PrivateRoute from "../index";

const Login = () => {
  return <div data-testid="privateRoute-component"></div>;
};

describe("PrivateRoute Component Test", () => {
  const history = createMemoryHistory();
  test("deve renderizar o component PrivateRoute", async () => {
    global.localStorage.setItem("jwt", "Bearer apsodkaopsdkasok");
    render(
      <Router history={history}>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute path="/" component={Login} />
      </Router>
    );

    expect(history.location.pathname).toBe("/");
  });
});
