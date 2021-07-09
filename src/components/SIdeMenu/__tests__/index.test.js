// Lib
import { render, screen } from "@testing-library/react";

// Components
import SideMenu from "../index";

describe("SideMenu Component Test", () => {
  beforeEach(() => {
    render(<SideMenu auth={false} />);
  });

  test("deve renderizar o componente SideMenu", () => {
    const sideMenuContainer = screen.getByTestId("sideMenu-container");

    expect(sideMenuContainer).toBeInTheDocument();
  });
});
