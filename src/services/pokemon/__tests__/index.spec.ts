/* eslint-disable jest/no-mocks-import */
import { PokemonService } from "..";
import {
  mockPokemonInfo,
  mockPokemonSearchMock,
} from "../../../__mocks__/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
describe("Pokemon Service", () => {
  it("should fetch pokemons paginated", () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPokemonSearchMock),
        })
      ) as jest.Mock
    );

    const response = PokemonService.getPokemons("0");
    expect(fetchMock).toHaveBeenCalledWith("0");
    expect(response).not.toBeNull();
  });

  it("should fetch a pokemon", () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPokemonInfo),
        })
      ) as jest.Mock
    );

    const response = PokemonService.getPokemon("my.url");
    expect(fetchMock).toHaveBeenCalledWith("my.url");
    expect(response).not.toBeNull();
  });

  it("should search a pokemon by Name", () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPokemonInfo),
        })
      ) as jest.Mock
    );

    const response = PokemonService.searchPokemon("bulbasaur");
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/bulbasaur`);
    expect(response).not.toBeNull();
  });
});
