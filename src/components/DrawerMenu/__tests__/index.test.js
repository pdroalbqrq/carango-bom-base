// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Components
import DrawerMenu from "../index";

describe("DrawerMenu Component Test", () => {
  beforeEach(() => {
    render(<DrawerMenu auth={false} />);
  });

  test("deve exibir o AppBar quando o componente for renderizado", () => {
    const appBarElement = screen.getByTestId("appBar");

    expect(appBarElement).toBeInTheDocument();
  });

  test("deve iniciar o menu drawer escondido", () => {
    let draweMenu = null;

    try {
      draweMenu = screen.getByTestId("drawer-menu");
    } catch (e) {}

    expect(draweMenu).toBeNull();
  });

  test("deve exibir o menu drawer quando o ícone de hamburguer for clicado", async () => {
    const hamburguerIcon = screen.getByTestId("hamburguer-icon");

    fireEvent.click(hamburguerIcon);

    const drawerMenu = screen.getByTestId("drawer-menu");

    await waitFor(() => {
      expect(drawerMenu).toBeInTheDocument();
    });
  });
});
