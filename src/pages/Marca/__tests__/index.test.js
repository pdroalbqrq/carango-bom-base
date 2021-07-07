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
import Marca from "../index";

// Mock
import mockService from "../../../utils/__mocks__/ServiceMock";

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
  });

  beforeEach(async () => {
    mockService(marca);

    await act(
      async () =>
        await render(
          <Router history={history}>
            <Route exact path="/marcas" component={Marca} />
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

  test("deve verificar se o elemento foi selecionado", async () => {
    let wrapper;
    await act(async () => {
      wrapper = await render(<Marca />);
    });
    const { container } = wrapper;

    const rows = container.querySelectorAll(".MuiDataGrid-row");

    console.log(rows);
  });

  test("deve verificar se mudou o history.local ao clicar no botao 'alterar'", async () => {
    fireEvent.click(insertButton);

    expect(history.location.pathname).toBe("/marcas/cadastro");
  });

  //   test("formulario inválido com erro de tamanho minimo", async () => {
  //     marcaValue = genValues(3);
  //     await waitFor(() => {
  //       fireEvent.change(marcaInput, { target: { value: marcaValue } });
  //     });

  //     expect(submitButton).toBeDisabled();
  //   });

  //   test("formulario inválido com erro de tamanho máximo", async () => {
  //     marcaValue = genValues(26);
  //     await waitFor(() => {
  //       fireEvent.change(marcaInput, { target: { value: marcaValue } });
  //     });

  //     expect(submitButton).toBeDisabled();
  //   });

  //   test("formulario válido", async () => {
  //     marcaValue = genValues(6);

  //     await waitFor(() => {
  //       fireEvent.change(marcaInput, { target: { value: marcaValue } });
  //     });

  //     expect(submitButton).toBeEnabled();
  //   });

  //   test("deve redirecionar para history '/marcas'", async () => {
  //     marcaValue = genValues(6);

  //     await waitFor(() => {
  //       fireEvent.change(marcaInput, { target: { value: marcaValue } });
  //     });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => expect(history.location.pathname).toBe("/marcas"));

  //     history.push("/marcas/cadastro");
  //   });

  //   test("ao clicar em 'Não possui conta' deve redirecionar para tela de cadastro", async () => {
  //     marcaValue = genValues(6);

  //     const cancelButton = screen.getByTestId("cancel-btn");

  //     await waitFor(() => {
  //       fireEvent.change(marcaInput, { target: { value: marcaValue } });
  //     });

  //     fireEvent.click(cancelButton);

  //     await waitFor(() => expect(history.location.pathname).toBe("/marcas"));
  //   });
});
