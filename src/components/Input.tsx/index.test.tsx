import { render, screen } from "@testing-library/react";
import { Input } from ".";
import userEvent from "@testing-library/user-event";

describe("<Input />", () => {
  const value = "test";

  it("should input text component", () => {
    render(<Input onHandleSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText(/buscar pokémon/i);
    expect(input).toBeInTheDocument();

    userEvent.type(input, value);
    expect(input).toHaveValue(value);
  });

  it("should call prop onHandleSearch when clicked on button", () => {
    const handleSearch = jest.fn();
    render(<Input onHandleSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/buscar pokémon/i);
    userEvent.type(input, value);

    userEvent.click(screen.getByLabelText("botão de busca"));
    expect(handleSearch).toHaveBeenCalledWith(value);
  });
});
