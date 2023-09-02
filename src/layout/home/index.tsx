import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { PokemonService } from "../../services/pokemon";
import { Pokemon, SimplePokemon } from "../../types";
import { Card } from "../../components/Card";
import { Pagination } from "../../components/Pagination";
import { Loader } from "../../components/Loader";
import { Input } from "../../components/Input.tsx";

const Home = () => {
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonSearched, setPokemonSearched] = useState<Pokemon>();

  const getPokemons = useCallback(async (page: string) => {
    setIsLoading(true);
    try {
      const { results, next, previous } = await PokemonService.getPokemons(
        page
      );
      setPokemons(results);
      setNextPage(next);
      setPreviousPage(previous);
    } catch (error) {
      console.error("Erro na busca de pokemons", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNextPage = () => {
    getPokemons(nextPage);
  };

  const handlePreviousPage = () => {
    if (!previousPage) return;

    getPokemons(previousPage);
  };

  useEffect(() => {
    getPokemons("");
  }, [getPokemons]);

  const onHandleSearch = async (value: string) => {
    try {
      const pokemon = await PokemonService.searchPokemonByName(value);
      if (pokemon) {
        setPokemonSearched(pokemon);
      }

      if (!value) {
        setPokemonSearched(undefined);
      }
    } catch (error) {
      console.log("Erro ao pesquisar por pokémon: ", error);
    }
  };

  return (
    <div className="h-full m-full bg-blue-100">
      <Header title="Pokédex">
        <Input onHandleSearch={onHandleSearch} />
      </Header>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <main className="mt-5 md:mt-10 flex justify-center flex-wrap">
          {!pokemonSearched &&
            pokemons.map((pokemon) => (
              <Card key={pokemon.name} simplePokemon={pokemon} />
            ))}
          {pokemonSearched && <Card pokemonSearched={pokemonSearched} />}
        </main>
      )}

      <footer className="flex w-full justify-center p-5 text-xl">
        <Pagination
          previousPage={previousPage}
          onHandleNext={handleNextPage}
          onHandlePrevious={handlePreviousPage}
        />
      </footer>
    </div>
  );
};

export default Home;
