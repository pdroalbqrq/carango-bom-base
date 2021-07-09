// Lib
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

// Mock
import mockService from "../../../utils/__mocks__/serviceMock";

// Components
import Dashboard from "../index";

const dashboardMock = [
  {
    marca: "GM-test",
    numVeiculos: 10,
    somaValor: 50000,
  },
  {
    marca: "FIAT-test",
    numVeiculos: 3,
    somaValor: 20000,
  },
];

const InitialRoute = () => {
  return <p data-testid="teste">Inicial Route</p>;
};

describe("Dashboard Component Test", () => {
  let history;

  beforeEach(() => {
    mockService(dashboardMock);

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

  test("deve renderizar os elementos do grid de acordo com os valores da requisição", async () => {
    const gridItemGM = await screen.findByText("GM-test");
    const gridItemFIAT = await screen.findByText("FIAT-test");

    expect(gridItemGM).toBeInTheDocument();
    expect(gridItemFIAT).toBeInTheDocument();
  });
});
