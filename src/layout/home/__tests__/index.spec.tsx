import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "..";
import { PokemonService } from "../../../services/pokemon";
import { BrowserRouter } from "react-router-dom";
// eslint-disable-next-line jest/no-mocks-import
import {
  localStorageMock,
  mockPokemonInfo,
  mockPokemonSearchMock,
} from "../../../__mocks__/pokemon";
import userEvent from "@testing-library/user-event";

const setup = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});

describe("<Home>", () => {
  it("should default components render on home screen", () => {
    render(<Home />);
    expect(screen.getByText("Pokédex")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar pokémon")).toBeInTheDocument();
    expect(
      screen.getByLabelText(/toggle trocar modo escuro/i)
    ).toBeInTheDocument();
  });

  it("should display the loader component waiting for api result", () => {
    render(<Home />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it("should display the cards and pagination when api return with pokemons", async () => {
    const getPokemonsPaginationSpy = jest
      .spyOn(PokemonService, "getPokemons")
      .mockResolvedValue(mockPokemonSearchMock);

    setup();

    expect(getPokemonsPaginationSpy).toHaveBeenCalled();
    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByLabelText("card pokemon")).toHaveLength(2);
    });

    expect(screen.queryByRole("status")).toBeNull();

    expect(screen.getByText(/Anterior/i)).toBeInTheDocument();
    expect(screen.getByText(/Próximo/i)).toBeInTheDocument();
  });

  it("should be able to search by a pokemon", async () => {
    const searchPokemon = "bulbasaur";
    const getPokemonsInfoSpy = jest
      .spyOn(PokemonService, "searchPokemon")
      .mockResolvedValue(mockPokemonInfo);

    setup();

    const input = screen.getByPlaceholderText("Buscar pokémon");
    const buttonSearch = screen.getByLabelText(/botão de busca/i);

    userEvent.type(input, "");
    userEvent.click(buttonSearch);

    expect(getPokemonsInfoSpy).not.toHaveBeenCalledWith(searchPokemon);

    userEvent.type(input, searchPokemon);
    userEvent.click(buttonSearch);
    expect(getPokemonsInfoSpy).toHaveBeenCalledWith(searchPokemon);

    await waitFor(() => {
      expect(screen.getByLabelText("card pokemon")).toBeInTheDocument();
    });
  });

  it("should be able to console error when api failed", async () => {
    const getPokemonsInfoSpy = jest
      .spyOn(PokemonService, "searchPokemon")
      .mockRejectedValue(500);

    setup();

    const input = screen.getByPlaceholderText("Buscar pokémon");
    const buttonSearch = screen.getByLabelText(/botão de busca/i);

    userEvent.type(input, "error");
    userEvent.click(buttonSearch);
    expect(getPokemonsInfoSpy).toHaveBeenCalledWith("error");
  });

  it("should call API to render next pokemons on pagination", () => {
    const getPokemonsPaginationSpy = jest
      .spyOn(PokemonService, "getPokemons")
      .mockResolvedValue(mockPokemonSearchMock);

    setup();

    const nextPage = screen.getByText(/Próximo/i);
    userEvent.click(nextPage);
    expect(getPokemonsPaginationSpy).toHaveBeenCalled();
  });

  it("should call API to render previous pokemons on pagination", () => {
    const getPokemonsPaginationSpy = jest
      .spyOn(PokemonService, "getPokemons")
      .mockResolvedValue(mockPokemonSearchMock);

    setup();

    const previous = screen.getByText(/Anterior/i);
    userEvent.click(previous);
    expect(getPokemonsPaginationSpy).toHaveBeenCalledTimes(1);
  });

  describe("when clicked on toggle to dark mode", () => {
    beforeEach(() => {
      window.sessionStorage.clear();
      jest.restoreAllMocks();
    });

    it("should set dark property on main div and session storage", () => {
      const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
      render(<Home />);
      const toggle = screen.getByLabelText(/toggle trocar modo escuro/i);
      userEvent.click(toggle);
      expect(screen.getByTestId("main-div")).toHaveClass("dark");
      expect(setItemSpy).toHaveBeenCalledWith("isDark", "true");
    });

    it("should set dark when have value on session storage", () => {
      const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
      window.sessionStorage.setItem("isDark", "true");
      render(<Home />);
      expect(screen.getByTestId("main-div")).toHaveClass("dark");

      const toggle = screen.getByLabelText(/toggle trocar modo escuro/i);
      userEvent.click(toggle);
      expect(setItemSpy).toHaveBeenCalledWith("isDark", "false");
    });
  });
});
