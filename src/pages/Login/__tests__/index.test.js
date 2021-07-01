// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

// Components
import Login from "../index";

describe("Login Component Test", () => {
  let userValue;
  let passValue;
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
    render(
      <Router history={history}>
        <Route exact path="/login" component={Login} />
      </Router>
    );
  });

  test("deve iniciar o formulario inválido com todos os campos vazios", async () => {
    const submitButton = screen.getByTestId("submit-btn");

    expect(submitButton).toBeDisabled();
  });

  test("campo 'Usuário' está recebendo evento onFocus", async () => {
    const usernameInput = screen.getByTestId("username-input");

    usernameInput.focus();

    expect(usernameInput).toHaveFocus();
  });

  test("campo 'Senha' está recebendo evento onFocus", async () => {
    const senhaInput = screen.getByTestId("password-input");

    senhaInput.focus();

    expect(senhaInput).toHaveFocus();
  });

  test("formulario inválido com erro de tamanho minimo", async () => {
    userValue = genValues(3);
    passValue = genValues(7);

    const submitButton = screen.getByTestId("submit-btn");
    const usernameInput = screen.getByTestId("username-input");
    const senhaInput = screen.getByTestId("password-input");

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario inválido com erro de tamanho máximo", async () => {
    userValue = genValues(26);
    passValue = genValues(51);

    const submitButton = screen.getByTestId("submit-btn");
    const usernameInput = screen.getByTestId("username-input");
    const senhaInput = screen.getByTestId("password-input");

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario válido", async () => {
    userValue = genValues(6);
    passValue = genValues(10);

    const submitButton = screen.getByTestId("submit-btn");
    const usernameInput = screen.getByTestId("username-input");
    const senhaInput = screen.getByTestId("password-input");

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    expect(submitButton).toBeEnabled();
  });

  test("deve redirecionar para history '/'", async () => {
    userValue = genValues(6);
    passValue = genValues(10);

    const submitButton = screen.getByTestId("submit-btn");
    const usernameInput = screen.getByTestId("username-input");
    const senhaInput = screen.getByTestId("password-input");

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
    });

    fireEvent.click(submitButton);

    expect(history.length).toBe(3);
    expect(history.location.pathname).toBe("/");
  });
});
