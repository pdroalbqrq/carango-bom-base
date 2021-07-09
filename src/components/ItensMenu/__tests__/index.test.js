// Lib
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

// Components
import ItensMenu from "../index";

describe("ItensMenu Component Test", () => {
  const history = createMemoryHistory();

  test("deve renderizar apenas as opções 'Entrar' e 'Veículos' quando o usuário não estiver logado", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: false, setIsAuth: () => {} }} />
      </Router>
    );

    const btnEntrar = screen.getByTestId("entrar-btn");
    const btnVeiculos = screen.getByTestId("veiculos-btn");
    const menuButtons = screen.getAllByRole("button");

    expect(btnEntrar).toBeInTheDocument();
    expect(btnVeiculos).toBeInTheDocument();
    expect(menuButtons).toHaveLength(2);
  });

  test("deve renderizar as opções 'Veículos', 'Marcas', 'Usuários', 'Dashboard' e 'Sair' quando o usuário estiver logado", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: true, setIsAuth: () => {} }} />
      </Router>
    );

    const btnVeiculos = screen.getByTestId("veiculos-btn");
    const btnMarcas = screen.getByTestId("marcas-btn");
    const btnUsuarios = screen.getByTestId("usuarios-btn");
    const btnDashboard = screen.getByTestId("dashboard-btn");
    const btnSair = screen.getByTestId("sair-btn");
    const menuButtons = screen.getAllByRole("button");

    expect(btnVeiculos).toBeInTheDocument();
    expect(btnMarcas).toBeInTheDocument();
    expect(btnUsuarios).toBeInTheDocument();
    expect(btnDashboard).toBeInTheDocument();
    expect(btnSair).toBeInTheDocument();
    expect(menuButtons).toHaveLength(5);
  });

  test("deve ir para página de url '/login' quando clicar na opção do menu: 'Entrar'", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: false, setIsAuth: () => {} }} />
      </Router>
    );

    const btnEntrar = screen.getByTestId("entrar-btn");

    fireEvent.click(btnEntrar);

    expect(history.location.pathname).toBe("/login");
  });

  test("deve ir para página de url '/' quando clicar na opção do menu: 'Veículos'", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: false, setIsAuth: () => {} }} />
      </Router>
    );

    const btnVeiculos = screen.getByTestId("veiculos-btn");

    fireEvent.click(btnVeiculos);

    expect(history.location.pathname).toBe("/");
  });

  test("deve ir para página de url '/marcas' quando clicar na opção do menu: 'Marcas'", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: true, setIsAuth: () => {} }} />
      </Router>
    );

    const btnMarcas = screen.getByTestId("marcas-btn");

    fireEvent.click(btnMarcas);

    expect(history.location.pathname).toBe("/marcas");
  });

  test("deve ir para página de url '/usuarios' quando clicar na opção do menu: 'Usuários'", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: true, setIsAuth: () => {} }} />
      </Router>
    );

    const btnUsuarios = screen.getByTestId("usuarios-btn");

    fireEvent.click(btnUsuarios);

    expect(history.location.pathname).toBe("/usuarios");
  });

  test("deve ir para página de url '/dashboard' quando clicar na opção do menu: 'Dashboard'", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: true, setIsAuth: () => {} }} />
      </Router>
    );

    const btnDashboard = screen.getByTestId("dashboard-btn");

    fireEvent.click(btnDashboard);

    expect(history.location.pathname).toBe("/dashboard");
  });

  test("deve ir para página de url '/login' quando clicar na opção do menu: 'Sair'", () => {
    render(
      <Router history={history}>
        <ItensMenu auth={{ isAuth: true, setIsAuth: () => {} }} />
      </Router>
    );

    const btnSair = screen.getByTestId("sair-btn");

    fireEvent.click(btnSair);

    expect(history.location.pathname).toBe("/login");
  });
});
