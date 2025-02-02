// Lib
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";

// Mock
import mockService from "../../../utils/__mocks__/serviceMock";

// Context
import { ContextProvider } from "../../../context";

// Components
import Usuario from "../index";

const usuarios = [
  { id: 1, nome: "Pedro" },
  { id: 2, nome: "Diego" },
  { id: 3, nome: "José" },
];

describe("Usuario Listagem Component Test", () => {
  const history = createMemoryHistory();
  let insertButton;
  let deleteButton;
  beforeAll(() => {
    history.push("/usuarios");
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  beforeEach(async () => {
    mockService(usuarios);

    render(
      <ContextProvider>
        <Router history={history}>
          <Route exact path="/usuarios" component={Usuario} />
        </Router>
      </ContextProvider>
    );

    insertButton = await screen.findByTestId("insert-btn");
    deleteButton = await screen.findByTestId("delete-btn");
  });

  test("deve iniciar a tela com os botões alterar e excluir desabilitados e o botao inserir habilitado", () => {
    expect(deleteButton).toBeDisabled();
    expect(insertButton).toBeEnabled();
  });

  test("deve verificar se o grid foi renderizado com sucesso", async () => {
    const grid = await screen.findByRole("grid");

    const header = await screen.findAllByRole("columnheader");
    expect(grid).toBeInTheDocument();
    expect(header).toHaveLength(1);
  });

  test("deve verificar se mudou o history.local ao clicar no botao 'alterar'", async () => {
    fireEvent.click(insertButton);

    expect(history.location.pathname).toBe("/usuarios/cadastro");
  });
});
