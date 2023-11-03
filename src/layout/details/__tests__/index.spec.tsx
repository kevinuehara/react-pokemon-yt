/* eslint-disable jest/no-mocks-import */
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Details } from "..";
import { render, screen } from "@testing-library/react";
import { PokemonService } from "../../../services/pokemon";
import { localStorageMock, mockPokemonInfo } from "../../../__mocks__/pokemon";
import userEvent from "@testing-library/user-event";

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
  useNavigate: () => mockNavigate,
}));

const setup = () =>
  render(
    <MemoryRouter initialEntries={[`/details/1`]}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

describe("<Details />", () => {
  beforeEach(() => {
    jest
      .spyOn(PokemonService, "searchPokemon")
      .mockResolvedValue(mockPokemonInfo);
  });
  it("should render details page", () => {
    setup();

    expect(screen.getByText("Pokédex")).toBeInTheDocument();
    expect(
      screen.getByLabelText(/toggle trocar modo escuro/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it("should render pokemon card details", async () => {
    const getPokemonsInfoSpy = jest
      .spyOn(PokemonService, "searchPokemon")
      .mockResolvedValue(mockPokemonInfo);

    setup();

    expect(getPokemonsInfoSpy).toHaveBeenCalledWith("1");

    expect(await screen.findByText(/voltar/i)).toBeInTheDocument();
    expect(screen.getByText(mockPokemonInfo.name)).toBeInTheDocument();
    expect(screen.getByText(`#${mockPokemonInfo.id}`)).toBeInTheDocument();
    expect(screen.getByLabelText("imagem pokemon")).toHaveAttribute(
      "src",
      mockPokemonInfo.sprites.front_default
    );

    mockPokemonInfo.types.forEach((type) => {
      expect(screen.getByText(type.type.name)).toBeInTheDocument();
    });

    mockPokemonInfo.abilities.forEach((abilitie) => {
      expect(screen.getByText(abilitie.ability.name)).toBeInTheDocument();
    });
  });

  it("should go to home when clicked to back", async () => {
    setup();

    expect(await screen.findByText(/voltar/i)).toBeInTheDocument();
    userEvent.click(await screen.findByText(/voltar/i));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  describe("when clicked on toggle to dark mode", () => {
    beforeEach(() => {
      window.sessionStorage.clear();
      jest.restoreAllMocks();
    });

    it("should set dark property on main div and session storage", () => {
      const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
      setup();
      const toggle = screen.getByLabelText(/toggle trocar modo escuro/i);
      userEvent.click(toggle);
      expect(screen.getByTestId("main-div")).toHaveClass("dark");
      expect(setItemSpy).toHaveBeenCalledWith("isDark", "true");
    });

    it("should set dark when have value on session storage", () => {
      const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
      window.sessionStorage.setItem("isDark", "true");
      setup();
      expect(screen.getByTestId("main-div")).toHaveClass("dark");

      const toggle = screen.getByLabelText(/toggle trocar modo escuro/i);
      userEvent.click(toggle);
      expect(setItemSpy).toHaveBeenCalledWith("isDark", "false");
    });
  });
});
