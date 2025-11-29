import { useState } from "react";
import PokemonSearch from "./components/PokemonSearch";
import PokemonCard from "./components/PokemonCard";
import { getPokemon } from "./services/pokemonApi";
import "./index.css";

function App() {
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (nameOrId: string) => {
    try {
      setError("");
      const data = await getPokemon(nameOrId.toLowerCase().trim());
      setPokemon(data);
    } catch {
      setPokemon(null);
      setError("Pokémon not found!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-900 flex flex-col items-center px-4 py-10 transition-colors duration-500">

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-8 tracking-wide animate-fadeIn">
        Pokédex
      </h1>

      {/* Search Section */}
      <div className="w-full z-50 max-w-md relative bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/40 animate-fadeIn">
        {/* Make this container relative so dropdown can be absolute */}
        <PokemonSearch onSearch={handleSearch} />

        {/* Error Message */}
        {error && (
          <p className="text-yellow-300 font-bold mt-3 text-center text-lg drop-shadow animate-fadeIn">
            {error}
          </p>
        )}
      </div>

      {/* Pokémon Card */}
      {pokemon && (
        <div className="mt-10 w-full max-w-lg animate-fadeIn z-10">
          <PokemonCard pokemon={pokemon} onSearch={handleSearch} />
        </div>
      )}
    </div>
  );
}

export default App;
