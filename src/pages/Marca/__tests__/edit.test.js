// Lib
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";

// Mock
import mockService from "../../../utils/__mocks__/serviceMock";

// Context
import { ContextProvider } from "../../../context";

// Components
import MarcaRegister from "../register";

const marca = [{ id: 74, nome: "CHEVROLET" }];

describe("Marca Cadastro Component Test", () => {
  let marcaValue;
  let submitButton;
  let marcaInput;
  const history = createMemoryHistory();

  const genValues = (qtd) => {
    let testString = "";

    for (let i = 0; i < qtd; i++) {
      testString = testString + "a";
    }

    return testString;
  };

  beforeAll(() => {
    history.push("/marcas/edicao/74");
  });

  beforeEach(async () => {
    mockService(marca);

    render(
      <ContextProvider>
        <Router history={history}>
          <Route exact path="/marcas/edicao/:id" component={MarcaRegister} />
        </Router>
      </ContextProvider>
    );

    submitButton = await screen.findByTestId("submit-btn");
    marcaInput = await screen.findByTestId("marca-input");
  });

  test("deve iniciar o formulario inválido com todos os campos vazios", () => {
    expect(submitButton).toBeDisabled();
  });

  test("campo 'Usuário' está mostrando erro no evento onFocus", () => {
    marcaInput.focus();

    const closestDiv = marcaInput.closest("div");

    expect(closestDiv).toHaveClass("Mui-error");
  });

  test("formulario inválido com erro de tamanho máximo", async () => {
    marcaValue = genValues(26);
    await waitFor(() => {
      fireEvent.change(marcaInput, { target: { value: marcaValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario válido", async () => {
    marcaValue = genValues(6);

    await waitFor(() => {
      fireEvent.change(marcaInput, { target: { value: marcaValue } });
    });

    expect(submitButton).toBeEnabled();
  });

  test("deve redirecionar para history '/marcas'", async () => {
    marcaValue = genValues(6);

    await waitFor(() => {
      fireEvent.change(marcaInput, { target: { value: marcaValue } });
    });
    fireEvent.click(submitButton);

    await waitFor(() => expect(history.location.pathname).toBe("/marcas"));

    history.push("/marcas/edicao/74");
  });

  test("ao clicar em 'Não possui conta' deve redirecionar para tela de cadastro", async () => {
    const cancelButton = await screen.findByTestId("cancel-btn");

    fireEvent.click(cancelButton);

    expect(history.location.pathname).toBe("/marcas");
  });
});
