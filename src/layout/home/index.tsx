import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { PokemonService } from "../../services/pokemon";
import { Pokemon, SimplePokemon } from "../../types";
import { Card } from "../../components/Card";
import { Pagination } from "../../components/Pagination";
import { Loader } from "../../components/Loader";
import { Input } from "../../components/Input.tsx";
import { Toogle } from "../../components/Toogle";
import { useAtom } from "jotai";
import { useIsDark } from "../../hooks/useTheme";

const Home = () => {
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();

  const [isDark, setIsDark] = useAtom(useIsDark);

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
    if (previousPage) {
      getPokemons(previousPage);
    }
  };

  useEffect(() => {
    getPokemons("");
  }, [getPokemons]);

  const onHandleSearch = async (value: string) => {
    try {
      const searchedPokemonResult = await PokemonService.searchPokemon(value);
      if (searchedPokemonResult) {
        setPokemon(searchedPokemonResult);
      }

      if (!value) {
        setPokemon(undefined);
      }
    } catch (error) {
      console.log("Erro ao pesquisar por pokémon: ", error);
    }
  };

  const handleDarkMode = () => {
    const newDarkValue = !isDark;
    setIsDark(newDarkValue);
    sessionStorage.setItem("isDark", newDarkValue.toString());
  };

  useEffect(() => {
    if (sessionStorage.getItem("isDark")) {
      const isDarkMode = sessionStorage.getItem("isDark");
      setIsDark(isDarkMode === "true" ? true : false);
    }
  }, [setIsDark]);

  return (
    <div
      data-testid="main-div"
      className={`h-full m-full bg-blue-100 ${isDark ? "dark" : ""}`}
    >
      <div className="dark:bg-gray-700">
        <Header title="Pokédex">
          <Input onHandleSearch={onHandleSearch} />
          <div className="absolute top-[150px] md:top-[70px]  md:bottom-2 left-5">
            <Toogle isDark={isDark} handleDark={handleDarkMode} />
          </div>
        </Header>

        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <main className="mt-5 md:mt-10 flex justify-center flex-wrap">
            {!pokemon &&
              pokemons.map((pokemon) => (
                <Card key={pokemon.name} simplePokemon={pokemon} />
              ))}

            {pokemon && <Card pokemonSearched={pokemon} />}
          </main>
        )}

        {!pokemon && (
          <footer className="flex w-full justify-center p-5 text-xl">
            <Pagination
              previousPage={previousPage}
              onHandleNext={handleNextPage}
              onHandlePrevious={handlePreviousPage}
            />
          </footer>
        )}
      </div>
    </div>
  );
};

export default Home;
