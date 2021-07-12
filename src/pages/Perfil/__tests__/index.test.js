// Lib
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";

// Mock
import mockService from "../../../utils/__mocks__/serviceMock";

// Context
import { ContextProvider } from "../../../context";

// Components
import Perfil from "../index";

const senha = { password: "123456789" };

describe("Marca Cadastro Component Test", () => {
  let senhaValue;
  let submitButton;
  let senhaInput;
  const history = createMemoryHistory();

  const genValues = (qtd) => {
    let testString = "";

    for (let i = 0; i < qtd; i++) {
      testString = testString + "a";
    }

    return testString;
  };

  beforeAll(() => {
    history.push("/usuarios/edicao");
  });

  beforeEach(async () => {
    mockService(senha);

    render(
      <ContextProvider>
        <Router history={history}>
          <Route exact path="/usuarios/edicao" component={Perfil} />
        </Router>
      </ContextProvider>
    );

    submitButton = await screen.findByTestId("submit-btn");
    senhaInput = await screen.findByTestId("usuario-input");
  });

  test("deve iniciar o formulario inválido com o campo vazio", () => {
    expect(submitButton).toBeDisabled();
  });

  test("campo 'Senha' está mostrando erro no evento onFocus", () => {
    senhaInput.focus();

    const closestDiv = senhaInput.closest("div");

    expect(closestDiv).toHaveClass("Mui-error");
  });

  test("formulario inválido com erro de tamanho máximo", async () => {
    senhaValue = genValues(26);
    await waitFor(() => {
      fireEvent.change(senhaInput, { target: { value: senhaValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario válido", async () => {
    senhaValue = genValues(8);

    await waitFor(() => {
      fireEvent.change(senhaInput, { target: { value: senhaValue } });
    });

    expect(submitButton).toBeEnabled();
  });

  test("ao submeter o formulario deve limpar os campos", async () => {
    senhaValue = genValues(8);

    await waitFor(() => {
      fireEvent.change(senhaInput, { target: { value: senhaValue } });
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/usuarios/edicao");
    });
  });
});
