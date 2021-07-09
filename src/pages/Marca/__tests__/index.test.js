// Lib
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";
// Mock
import mockService from "../../../utils/__mocks__/serviceMock";
// Components
import Marca from "../index";

const marca = [
  { id: 74, nome: "CHEVROLET" },
  { id: 34, nome: "FORD" },
  { id: 64, nome: "PEUGEOT" },
  { id: 4, nome: "VOLKS" },
];

describe("Marca Cadastro Component Test", () => {
  const history = createMemoryHistory();
  let insertButton;
  let deleteButton;
  let editButton;

  beforeAll(() => {
    history.push("/marcas");
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  beforeEach(async () => {
    mockService(marca);

    render(
      <Router history={history}>
        <Route exact path="/marcas" component={Marca} />
      </Router>
    );

    insertButton = await screen.findByTestId("insert-btn");
    editButton = await screen.findByTestId("edit-btn");
    deleteButton = await screen.findByTestId("delete-btn");
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

    expect(history.location.pathname).toBe("/marcas/cadastro");
  });
});
