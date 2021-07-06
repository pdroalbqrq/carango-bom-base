// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

// Components
import Cadastro from "../index";

describe("Cadastro Component Test", () => {
  let userValue;
  let passValue;
  let confirmPassValue;
  let submitButton;
  let usernameInput;
  let senhaInput;
  let confirmarSenhaInput;
  const history = createMemoryHistory();

  const genValues = (qtd) => {
    let testString = "";

    for (let i = 0; i < qtd; i++) {
      testString = testString + "a";
    }

    return testString;
  };

  beforeAll(() => {
    history.push("/cadastro");
  });

  beforeEach(() => {
    render(
      <Router history={history}>
        <Route exact path="/cadastro" component={Cadastro} />
      </Router>
    );

    submitButton = screen.getByTestId("submit-btn");
    usernameInput = screen.getByTestId("username-input");
    senhaInput = screen.getByTestId("password-input");
    confirmarSenhaInput = screen.getByTestId("confirmpassword-input");
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

  test("campo 'Confirmar Senha' está mostrando erro no evento onFocus", () => {
    confirmarSenhaInput.focus();

    const closestDiv = confirmarSenhaInput.closest("div");

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
    confirmPassValue = genValues(10);

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
      fireEvent.change(confirmarSenhaInput, {
        target: { value: confirmPassValue },
      });
    });

    expect(submitButton).toBeEnabled();
  });

  test("deve redirecionar para history '/'", async () => {
    userValue = genValues(6);
    passValue = genValues(10);

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
      fireEvent.change(confirmarSenhaInput, {
        target: { value: confirmPassValue },
      });
    });

    fireEvent.click(submitButton);

    expect(history.length).toBe(3);
    expect(history.location.pathname).toBe("/login");

    history.push("/cadastro");
  });

  test("ao clicar em 'Não possui conta' deve redirecionar para tela de cadastro", async () => {
    userValue = genValues(6);
    passValue = genValues(10);
    confirmPassValue = genValues(10);

    const registerButton = screen.getByTestId("login-btn");

    await waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: userValue } });
      fireEvent.change(senhaInput, { target: { value: passValue } });
      fireEvent.change(confirmarSenhaInput, {
        target: { value: confirmPassValue },
      });
    });

    fireEvent.click(registerButton);

    expect(history.location.pathname).toBe("/login");
  });
});
