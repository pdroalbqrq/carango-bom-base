import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../index";

describe("Login Component Test", () => {
  let submitButton;
  let usernameInput;
  let senhaInput;
  let userValue;
  let passValue;

  const genValues = (qtd) => {
    return Math.random().toString(36).substring(qtd);
  };

  beforeEach(() => {
    render(<Login />);
    submitButton = screen.getByRole("button", { name: "Entrar" });
    usernameInput = screen.getByRole("textbox", { name: "Usuário" });
    senhaInput = screen.getByRole("textbox", { name: "Senha" });
  });

  test("deve iniciar o formulario inválido com todos os campos vazios", async () => {
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      fireEvent.focusIn(usernameInput);
      fireEvent.focusIn(senhaInput);
    });

    expect(submitButton).toBeDisabled();
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

    expect(submitButton).toBeDisabled();
  });
});
