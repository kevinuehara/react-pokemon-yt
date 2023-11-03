export const mockPokemonSearchMock = {
  count: 1292,
  next: "https://pokeapi.co/api/v2/pokemon?offset=2&limit=2",
  previous: "https://pokeapi.co/api/v2/pokemon?offset=1&limit=0",
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
  ],
};

export const mockPokemonInfo = {
  id: 1,
  order: 1,
  name: "bulbasaur",
  types: [
    {
      type: {
        name: "normal",
      },
    },
  ],
  sprites: {
    front_default: "testing.jpg",
  },
  abilities: [
    {
      ability: {
        name: "limber",
        slot: 3,
      },
    },
  ],
};

export const localStorageMock = (() => {
  let store: any = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
