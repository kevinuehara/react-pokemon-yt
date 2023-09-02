import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pokemon } from "../../types";
import { PokemonService } from "../../services/pokemon";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import { Label } from "../../components/Label";

export const Details = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getPokemon = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const pokemon = await PokemonService.searchPokemonById(id);
      setPokemon(pokemon);
    } catch (error) {
      console.error("Erro ao buscar pokémon", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    getPokemon(id);
  }, [getPokemon, id]);

  return (
    <div className="h-screen m-screen flex flex-col bg-blue-100">
      <Header title="Pokédex" />

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <main className="mt-5 h-screen">
          <label
            className="text-2xl font-semibold m-5 text-blue-600 cursor-pointer hover:text-blue-800 transition"
            onClick={() => navigate("/")}
          >
            {"<<"} Voltar
          </label>
          <div className="flex justify-center mt-5 md:mt-24">
            <div className="bg-gray-100 p-5 mt-5 w-full md:w-1/2 rounded-md">
              <div className="flex flex-col md:flex-row justify-evenly md:items-start w-full">
                <div className="flex flex-col items-center">
                  <label className="text-2xl text-blue-700">{`#${pokemon?.id}`}</label>
                  <img
                    src={pokemon?.sprites.front_default}
                    alt="pokemon"
                    className="w-64"
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold text-blue-700">
                    <span className="font-normal">Nome:</span> {pokemon?.name}
                  </h1>
                  <div>
                    <h1 className="text-2xl font-semibold text-blue-700 mt-2">
                      Tipos:
                    </h1>
                    <div className="flex gap-3 mt-2">
                      {pokemon?.types.map((type, index) => (
                        <Label
                          key={`${type.type.name}-${index}`}
                          label={type.type.name}
                        />
                      ))}
                    </div>

                    <h1 className="text-2xl font-semibold text-blue-700 mt-2 mb-2">
                      Habilidades:
                    </h1>
                    <div className="flex flex-col gap-1">
                      {pokemon?.abilities.map((ability, index) => (
                        <div
                          key={index}
                          className="bg-fuchsia-600 text-white rounded-md p-2 flex justify-center"
                        >
                          {ability.ability.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="h-24 bg-blue-600 flex justify-center items-center text-white">
        <label className="text-lg">Created by Kevin Uehara 2023</label>
      </footer>
    </div>
  );
};
