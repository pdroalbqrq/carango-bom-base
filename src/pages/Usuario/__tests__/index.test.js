// Lib
import {
  render,
  screen,
  fireEvent,
  waitFor,
  mount,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Components
import Usuario from "../index";

// Mock
import mockService from "../../../utils/__mocks__/ServiceMock";

const usuarios = [
  { id: 1, nome: "Pedro" },
  { id: 2, nome: "Diego" },
  { id: 3, nome: "José" },
];

describe("Usuario Listagem Component Test", () => {
  const history = createMemoryHistory();
  let insertButton;
  let deleteButton;
  let editButton;

  beforeAll(() => {
    history.push("/usuarios");
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  beforeEach(async () => {
    mockService(usuarios);

    await act(
      async () =>
        await render(
          <Router history={history}>
            <Route exact path="/usuarios" component={Usuario} />
          </Router>
        )
    );

    insertButton = screen.getByTestId("insert-btn");
    editButton = screen.getByTestId("edit-btn");
    deleteButton = screen.getByTestId("delete-btn");
  });

  test("deve iniciar a tela com os botões alterar e excluir desabilitados e o botao inserir habilitado", () => {
    expect(editButton).toBeDisabled();
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
