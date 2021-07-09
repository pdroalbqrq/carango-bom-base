// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Components
import Veiculo from "../register";

// Mock
import mockService from "../../../utils/__mocks__/ServiceMock";

const veiculo = [
  {
    id: 999,
    modelo: "Test Car",
    ano: 2021,
    valor: 67000,
    marca: {
      id: 5,
      nome: "Honda",
    },
  },
];

describe("Veiculo Edição Component Test", () => {
  const history = createMemoryHistory();
  let cancelButton;
  let registerButton;

  beforeAll(() => {
    history.push("/veiculos/edicao/999");
  });

  beforeEach(async () => {
    mockService(veiculo);

    await act(
      async () =>
        await render(
          <Router history={history}>
            <Route exact path="/veiculos/edicao/:id" component={Veiculo} />
          </Router>
        )
    );

    cancelButton = screen.getByTestId("cancel-btn");
    registerButton = screen.getByTestId("register-btn");
  });

  test("ao clicar em 'CANCELAR' deve redirecionar para tela de listagem", async () => {
    cancelButton = screen.getByTestId("cancel-btn");

    fireEvent.click(cancelButton);

    expect(history.location.pathname).toBe("/");
  });
});
