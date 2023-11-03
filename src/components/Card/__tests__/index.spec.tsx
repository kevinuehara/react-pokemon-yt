/* eslint-disable jest/no-mocks-import */
import { findByText, render, screen } from "@testing-library/react";
import { Card } from "..";
import {
  mockPokemonInfo,
  mockPokemonSearchMock,
} from "../../../__mocks__/pokemon";
import { PokemonService } from "../../../services/pokemon";
import userEvent from "@testing-library/user-event";
import { debug } from "console";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<Card />", () => {
  const simplePokemon = mockPokemonSearchMock.results[0];

  beforeEach(() => {
    jest.spyOn(PokemonService, "getPokemon").mockResolvedValue(mockPokemonInfo);
  });
  it("should render the card with a simple pokemon", async () => {
    const mockPokemonSpy = jest
      .spyOn(PokemonService, "getPokemon")
      .mockResolvedValue(mockPokemonInfo);

    render(<Card simplePokemon={simplePokemon} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(mockPokemonSpy).toHaveBeenCalledWith(simplePokemon.url);

    expect(await screen.findByText(mockPokemonInfo.name)).toBeInTheDocument();
    expect(
      await screen.findByText(`#${mockPokemonInfo.order}`)
    ).toBeInTheDocument();

    mockPokemonInfo.types.forEach((type) => {
      expect(screen.getByText(type.type.name)).toBeInTheDocument();
    });

    expect(screen.getByLabelText("imagem pokemon")).toHaveAttribute(
      "src",
      mockPokemonInfo.sprites.front_default
    );
  });

  it("should navigate to details page when clicked on card", () => {
    render(<Card simplePokemon={simplePokemon} />);

    const card = screen.getByLabelText("card pokemon");
    userEvent.click(card);
    expect(mockNavigate).not.toHaveBeenCalledWith(
      `/details/${mockPokemonInfo.id}`
    );
  });
});
