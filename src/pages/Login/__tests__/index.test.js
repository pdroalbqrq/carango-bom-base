// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

// Context
import { ContextProvider } from "../../../context";

// Components
import Login from "../index";

// Mock
import mockService from "../../../utils/__mocks__/serviceMock";

describe("Login Component Test", () => {
  let userValue;
  let passValue;
  let submitButton;
  let usernameInput;
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
    history.push("/login");
  });

  beforeEach(() => {
    mockService({ type: "Bearer", token: "ehjyaodiJSIDjasd" });
    render(
      <ContextProvider>
        <Router history={history}>
          <Route
            exact
            path="/login"
            render={() => <Login setAuth={(auth) => auth} />}
          />
        </Router>
      </ContextProvider>
    );

    submitButton = screen.getByTestId("submit-btn");
    usernameInput = screen.getByTestId("username-input");
    senhaInput = screen.getByTestId("password-input");
  });

  test("deve iniciar o formulario inválido com todos os campos vazios", () => {
    expect(submitButton).toBeDisabled();
  });

  test("campo 'Usuário' está mostrando erro no evento onFocus", () => {
    usernameInput.focus();

    const closestDiv = usernameInput.closest("div");

    expect(closestDiv).toHaveClass("Mui-error");
  });

  test("campo 'Senha' está mostrando erro no evento onFocus", () => {
    senhaInput.focus();

    const closestDiv = senhaInput.closest("div");

    expect(closestDiv).toHaveClass("Mui-error");
  });

  test("formulario inválido com erro de tamanho minimo", async () => {
    userValue = genValues(3);
    passValue = genValues(7);

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario inválido com erro de tamanho máximo", async () => {
    userValue = genValues(26);
    passValue = genValues(51);

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario válido", async () => {
    userValue = genValues(6);
    passValue = genValues(10);

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    expect(submitButton).toBeEnabled();
  });

  test("deve redirecionar para history '/'", async () => {
    userValue = genValues(6);
    passValue = genValues(10);

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(history.length).toBe(3);
      expect(history.location.pathname).toBe("/");
    });

    history.push("/login");
  });

  test("ao clicar em 'Não possui conta' deve redirecionar para tela de cadastro", async () => {
    const registerButton = screen.getByTestId("register-btn");

    fireEvent.click(registerButton);

    expect(history.location.pathname).toBe("/cadastro");
  });
});
