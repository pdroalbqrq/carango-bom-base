import { render, screen, fireEvent, act } from "@testing-library/react";
import Login from "../index";

describe("Login Component Test", () => {
  test("deve iniciar o formulario inválido", () => {
    render(<Login />);

    const username = screen.getByRole("textbox", { name: "Usuário" });

    fireEvent.change(username, { target: { value: "tes" } });

    expect(username).toBeInTheDocument();
  });
});
