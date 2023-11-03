import { useCallback, useEffect, useState } from "react";
import { Pokemon, SimplePokemon } from "../../types";
import { PokemonService } from "../../services/pokemon";
import { Label } from "../Label";
import { Skeleton } from "../Skeleton";
import { useNavigate } from "react-router-dom";

interface CardProps {
  simplePokemon?: SimplePokemon;
  pokemonSearched?: Pokemon;
}

export const Card = ({ simplePokemon, pokemonSearched }: CardProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getPokemon = useCallback(async () => {
    setIsLoading(true);
    try {
      const pokemonResponse = await PokemonService.getPokemon(
        simplePokemon ? simplePokemon.url : ""
      );
      setPokemon(pokemonResponse);
    } catch (error) {
      console.error("Erro ao buscar o pokemon: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [simplePokemon]);

  useEffect(() => {
    if (pokemonSearched) {
      setPokemon(pokemonSearched);
    } else {
      getPokemon();
    }
  }, [getPokemon, pokemonSearched]);

  const handleDetailPokemonPage = (id?: number) => {
    if (!id) return;
    navigate(`/details/${id}`);
  };

  return (
    <div
      aria-label="card pokemon"
      className="h-44 w-52 bg-white hover:bg-blue-300 transition m-5 flex justify-between rounded-md cursor-pointer shadow-xl dark:bg-gray-900 hover:dark:bg-gray-500"
      onClick={() => handleDetailPokemonPage(pokemon?.id)}
    >
      {isLoading ? (
        <div className="w-full h-full">
          <Skeleton />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col dark:text-white">
          <div className="w-full flex justify-around items-center mt-2">
            <h2 className="text-2xl font-medium">{pokemon?.name}</h2>
            <p className="text-xl font-normal">{`#${pokemon?.order}`}</p>
          </div>
          <div className="flex items-center justify-around">
            <div className="flex flex-col gap-2 ml-2">
              {pokemon?.types.map((type, index) => (
                <Label
                  key={`${type.type.name}-${index}`}
                  label={type.type.name}
                />
              ))}
            </div>
            <img
              aria-label="imagem pokemon"
              className="h-32 w-32"
              src={pokemon?.sprites.front_default}
              alt="Pokemon Sprite"
            />
          </div>
        </div>
      )}
    </div>
  );
};
