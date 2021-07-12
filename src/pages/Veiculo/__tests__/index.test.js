// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Components
import Veiculo from "../index";

// Context
import { ContextProvider } from "../../../context";

// Mock
import mockService from "../../../utils/__mocks__/ServiceMock";

const veiculos = [
  {
    id: 999,
    modelo: "Test Car",
    ano: 2020,
    valor: 127000,
    marca: {
      id: 5,
      nome: "Honda",
    },
  },
];

describe("Veiculo Listagem Component Test", () => {
  const history = createMemoryHistory();
  let deleteButton;
  let insertButton;

  beforeAll(() => {
    history.push("/");
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  beforeEach(async () => {
    mockService(veiculos);

    await act(
      async () =>
        await render(
          <ContextProvider>
            <Router history={history}>
              <Route exact path="/" component={Veiculo} />
            </Router>
          </ContextProvider>
        )
    );

    insertButton = screen.getByTestId("insert-btn");
    deleteButton = screen.getByTestId("delete-btn");
  });

  test("deve iniciar a tela com os botões alterar e excluir desabilitados e o botao inserir habilitado", () => {
    expect(deleteButton).toBeDisabled();
    expect(insertButton).toBeEnabled();
  });

  test("deve verificar se o DataGrid foi renderizado com sucesso", async () => {
    const grid = await screen.findByRole("grid");

    expect(grid).toBeInTheDocument();
  });

  test("deve habilitar o botão 'EXCLUIR' ao selecionar uma linha do grid", async () => {
    const veiculoTest = await screen.getByText("Test Car");

    fireEvent.click(veiculoTest);

    expect(deleteButton).toBeEnabled();
  });

  test("deve verificar se o número de linhas corresponde à requisição", async () => {
    const veiculoTest = await screen.getByText("Test Car");

    expect(veiculoTest).toBeInTheDocument();
  });

  test("deve ir para tela de cadastro quando clicar no botao 'INCLUIR'", async () => {
    fireEvent.click(insertButton);

    expect(history.location.pathname).toBe("/veiculos/cadastro");

    await waitFor(() => {
      history.push("/");
    });
  });

  test("deve acionar a exclusão de um item quando clicar no botão 'EXCLUIR'", async () => {
    const veiculoTest = await screen.getByText("Test Car");

    fireEvent.click(veiculoTest);

    await waitFor(() => {
      fireEvent.click(deleteButton);
    });

    expect(deleteButton).toBeDisabled();
  });
});
