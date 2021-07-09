// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Components
import MarcaRegister from "../register";

// Mock
import mockService from "../../../utils/__mocks__/ServiceMock";

const marca = { id: 74, nome: "CHEVROLET" };

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
    history.push("/marcas/cadastro");
  });

  beforeEach(async () => {
    mockService(marca);

    await act(
      async () =>
        await render(
          <Router history={history}>
            <Route exact path="/marcas/cadastro" component={MarcaRegister} />
          </Router>
        )
    );

    submitButton = screen.getByTestId("submit-btn");
    marcaInput = screen.getByTestId("marca-input");
  });

  test("deve iniciar o formulario inválido com todos os campos vazios", () => {
    expect(submitButton).toBeDisabled();
  });

  test("campo 'Usuário' está mostrando erro no evento onFocus", () => {
    marcaInput.focus();

    const closestDiv = marcaInput.closest("div");

    expect(closestDiv).toHaveClass("Mui-error");
  });

  test("formulario inválido com erro de tamanho minimo", async () => {
    marcaValue = genValues(3);
    await waitFor(() => {
      fireEvent.change(marcaInput, { target: { value: marcaValue } });
    });

    expect(submitButton).toBeDisabled();
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

    history.push("/marcas/cadastro");
  });

  test("ao clicar em 'CANCELAR' deve redirecionar para tela de listagem", async () => {
    const cancelButton = screen.getByTestId("cancel-btn");

    fireEvent.click(cancelButton);

    expect(history.location.pathname).toBe("/marcas");
  });
});
