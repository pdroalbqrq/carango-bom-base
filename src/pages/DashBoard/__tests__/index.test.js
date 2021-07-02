// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

// Components
import Dashboard from "../index";

const InitialRoute = () => {
  return <p data-testid="teste">Inicial Route</p>;
};

describe("Dashboard Component Test", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();

    render(
      <Router history={history}>
        <Route exact path="/" component={InitialRoute} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
    );
    history.push("/dashboard");
  });

  test("A rota atual deve ser '/dashboard'", () => {
    expect(history.location.pathname).toBe("/dashboard");
  });

  test("O componente renderizado deve corresponder a rota atual", () => {
    const dashboardGrid = screen.getByTestId("dashboard-grid");
    expect(dashboardGrid).toBeInTheDocument();
  });
});
