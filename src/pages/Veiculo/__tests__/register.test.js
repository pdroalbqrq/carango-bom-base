// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

// Components
import Veiculo from "../register";

// Context
import { ContextProvider } from "../../../context";

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

describe("Veiculo Cadastro Component Test", () => {
  const history = createMemoryHistory();
  let cancelButton;
  let registerButton;

  let marcaInput;
  let anoInput;
  let modeloInput;
  let valorInput;

  const genValues = (qtd) => {
    let testString = "";

    for (let i = 0; i < qtd; i++) {
      testString = testString + "a";
    }

    return testString;
  };

  beforeAll(() => {
    history.push("/veiculos/cadastro");
  });

  beforeEach(async () => {
    mockService(veiculo);

    render(
      <ContextProvider>
        <Router history={history}>
          <Route exact path="/veiculos/cadastro" component={Veiculo} />
        </Router>
      </ContextProvider>
    );

    cancelButton = await screen.findByTestId("cancel-btn");
    registerButton = await screen.findByTestId("register-btn");

    marcaInput = await screen.findByTestId("marca-input");
    anoInput = await screen.findByTestId("ano-input");
    modeloInput = await screen.findByTestId("modelo-input");
    valorInput = await screen.findByTestId("valor-input");
  });

  test("ao clicar em 'CANCELAR' deve redirecionar para tela de listagem", async () => {
    fireEvent.click(cancelButton);

    expect(history.location.pathname).toBe("/");

    await waitFor(() => {
      history.push("/veiculos/cadastro");
    });
  });

  test("deve iniciar o formulario inválido com todos os campos vazios", () => {
    expect(registerButton).toBeDisabled();
  });

  test("campos 'Modelo', 'Ano' e 'Valor' estão mostrando erro no evento onFocus", () => {
    let closestDiv;

    valorInput.focus();
    closestDiv = valorInput.closest("div");
    expect(closestDiv).toHaveClass("Mui-error");

    modeloInput.focus();
    closestDiv = modeloInput.closest("div");
    expect(closestDiv).toHaveClass("Mui-error");

    anoInput.focus();
    closestDiv = anoInput.closest("div");
    expect(closestDiv).toHaveClass("Mui-error");
  });
});
