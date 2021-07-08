// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

// Components
import Cadastro from "../register";

// Mock
import mockService from "../../../utils/__mocks__/serviceMock";

const data = [
  {
    id: 1,
    nome: "Pedro",
  },
  {
    id: 2,
    nome: "Diego",
  },
  {
    id: 3,
    nome: "José",
  },
];

describe("Login Component Test", () => {
  let nameValue;
  let submitButton;
  let nameInput;
  const history = createMemoryHistory();

  const genValues = (qtd) => {
    let testString = "";

    for (let i = 0; i < qtd; i++) {
      testString = testString + "a";
    }

    return testString;
  };

  beforeAll(() => {
    history.push("/usuario/cadastro");
  });

  beforeEach(async () => {
    mockService(data);

    render(
      <Router history={history}>
        <Route exact path="/usuario/cadastro" component={Cadastro} />
      </Router>
    );

    submitButton = await screen.findByTestId("submit-btn");
    nameInput = await screen.findByTestId("name-input");
  });

  test("deve iniciar o formulario inválido com todos os campos vazios", () => {
    expect(submitButton).toBeDisabled();
  });

  test("campo 'Usuário' está mostrando erro no evento onFocus", () => {
    nameInput.focus();

    const closestDiv = nameInput.closest("div");

    expect(closestDiv).toHaveClass("Mui-error");
  });

  test("formulario inválido com erro de tamanho minimo", async () => {
    nameValue = genValues(3);

    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: nameValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario inválido com erro de tamanho máximo", async () => {
    nameValue = genValues(26);

    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: nameValue } });
    });

    expect(submitButton).toBeDisabled();
  });

  test("formulario válido", async () => {
    nameValue = genValues(6);

    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: nameValue } });
    });

    expect(submitButton).toBeEnabled();
  });

  test("deve redirecionar para history '/'", async () => {
    nameValue = genValues(6);
    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: nameValue } });
    });

    fireEvent.click(submitButton);

    await waitFor(() => expect(history.location.pathname).toBe("/usuarios"));

    history.push("/usuario/cadastro");
  });

  test("ao clicar em 'Não possui conta' deve redirecionar para tela de cadastro", async () => {
    const registerButton = await screen.findByTestId("cancel-btn");

    fireEvent.click(registerButton);

    expect(history.location.pathname).toBe("/usuarios");
  });
});
