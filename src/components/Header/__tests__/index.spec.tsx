import { render, screen } from "@testing-library/react";
import { Header } from "..";

describe("<Header />", () => {
  it("should render the header component", () => {
    const title = "Testing title";
    render(<Header title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
