import { render, screen } from "@testing-library/react";
import { Label } from "..";

describe("<Label />", () => {
  it("should render the Label component passing the type", () => {
    const label = "fire";
    render(<Label label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByTestId("label wrapper")).toHaveClass("bg-red-600");
  });

  it("should render the Label component passing the type not mapped", () => {
    const label = "kevin";
    render(<Label label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByTestId("label wrapper")).toHaveClass("bg-cyan-800");
  });
});
