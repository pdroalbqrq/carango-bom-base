// Lib
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Components
import PrivateRoute from "../index";

describe("PrivateRoute Component Test", () => {
  beforeEach(() => {
    render(<PrivateRoute />);
  });

  test("deve renderizar o component PrivateRoute", () => {
    privateRoute = screen.getByTestId("privateRoute-component");

    expect(privateRoute).toBeInTheDocument();
  });
});
