import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface InputProps {
  onHandleSearch: (value: string) => void;
}

export const Input = ({ onHandleSearch }: InputProps) => {
  const [pokemon, setPokemon] = useState("");

  return (
    <div className="absolute top-[70px] flex justify-center w-full">
      <div className="bg-white flex h-16 w-full md:w-1/2 justify-center items-center rounded-md p-3">
        <input
          onChange={(e) => setPokemon(e.target.value)}
          value={pokemon}
          className="w-full h-full outline-none"
          type="text"
          placeholder="Buscar pokémon"
        />
        <button
          aria-label="botão de busca"
          className="h-full bg-blue-600 hover:bg-blue-400 w-16 flex justify-center items-center rounded-md"
          onClick={() => onHandleSearch(pokemon)}
        >
          <MagnifyingGlassIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};
