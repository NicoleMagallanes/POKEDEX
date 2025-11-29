import { useState, useEffect } from "react";
import { fetchEvolutions } from "../services/pokemonEvolution";
import { getPokemonSpriteUrl } from "../services/evolutionSprites";
// import { fetchPokemonCategory } from "../services/pokemonCategory";

interface PokemonCardProps {
  pokemon: any;
  onSearch: (name: string) => void; // allow clicking evolutions to load them
}

export default function PokemonCard({ pokemon, onSearch }: PokemonCardProps) {
  const types = pokemon.types.map((t: any) => t.type.name);
  const weaknesses = getWeaknesses(types);
// const [category, setCategory] = useState<string>("");
  const [evolutions, setEvolutions] = useState<string[]>([]);

  // Fetch evolution chain using the helper
  useEffect(() => {
//     const loadCategory = async () => {
//     const cat = await fetchPokemonCategory(pokemon.name);
//     setCategory(cat);
//   };
//   loadCategory();
    const loadEvolutions = async () => {
      const evoList = await fetchEvolutions(pokemon.name);
      setEvolutions(evoList);
    };
    loadEvolutions();
  }, [pokemon]);

  // Filter moves
  const levelUpMoves = pokemon.moves
    .filter((m: any) =>
      m.version_group_details.some(
        (v: any) => v.move_learn_method.name === "level-up"
      )
    )
    .map((m: any) => m.move.name);

  const eggMoves = pokemon.moves
    .filter((m: any) =>
      m.version_group_details.some(
        (v: any) => v.move_learn_method.name === "egg"
      )
    )
    .map((m: any) => m.move.name);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn">

      {/* Main Info Card */}
      <div className="p-6 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-3xl">
        {/* Name */}
        <h2 className="text-3xl md:text-4xl font-bold capitalize text-gray-800 text-center mb-6">
          {pokemon.name}
        </h2>

        {/* Sprite */}
        <div className="flex justify-center mb-6">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 md:w-48 drop-shadow-lg hover:scale-110 transition-transform duration-300"
          />
        </div>
{/* Pokémon Category */}
{/* <div className="mb-4 text-center md:text-left">
  <h3 className="font-semibold text-lg text-gray-700 mb-2">Category</h3>
  <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-sm capitalize shadow-md font-semibold">
    {category}
  </span>
</div> */}
        {/* Types */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700 mb-2 text-center md:text-left">Types</h3>
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {types.map((type: string) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-white text-sm capitalize shadow-md font-semibold transition-colors duration-300"
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700 mb-2 text-center md:text-left">Weaknesses</h3>
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {weaknesses.length > 0 ? (
              weaknesses.map((w) => (
                <span
                  key={w}
                  className="px-3 py-1 rounded-full bg-red-500 text-white text-sm capitalize shadow-md font-semibold transition-all duration-300 hover:scale-105"
                >
                  {w}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No major weaknesses</p>
            )}
          </div>
        </div>

        {/* Base Stats */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700 mb-2 text-center md:text-left">Base Stats</h3>
          <div className="space-y-2">
            {pokemon.stats.map((s: any) => (
              <div key={s.stat.name}>
                <div className="flex justify-between mb-1 text-gray-700 capitalize font-medium">
                  <span>{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${(s.base_stat / 255) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evolutions */}
        {evolutions.length > 1 && (
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2 text-center md:text-left">Evolution</h3>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              {evolutions.map((name) => (
                <div
                  key={name}
                  className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => onSearch(name)}
                >
                  <img
                    src={getPokemonSpriteUrl(name, pokemon, evolutions)}
                    alt={name}
                    className="w-16 h-16"
                  />
                  <span className="capitalize text-sm mt-1">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Moves Card */}
      <div className="p-6 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-3xl">
        {/* Level-Up Moves */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Level-Up Moves</h3>
          <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1">
            {levelUpMoves.map((move: string) => (
              <span
                key={move}
                className="px-2 py-1 bg-blue-400 text-white text-sm rounded-full shadow-sm capitalize hover:bg-blue-500 transition-colors"
              >
                {move}
              </span>
            ))}
          </div>
        </div>

        {/* Egg Moves */}
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Egg Moves</h3>
          <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1">
            {eggMoves.length > 0 ? (
              eggMoves.map((move: string) => (
                <span
                  key={move}
                  className="px-2 py-1 bg-green-400 text-white text-sm rounded-full shadow-sm capitalize hover:bg-green-500 transition-colors"
                >
                  {move}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No Egg Moves</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Type colors
function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#F0B6BC",
    normal: "#A8A878",
  };
  return colors[type] || "#A8A878";
}

// Weaknesses (simplified)
function getWeaknesses(types: string[]) {
  const weaknessMap: Record<string, string[]> = {
    fire: ["water", "rock", "ground"],
    water: ["electric", "grass"],
    grass: ["fire", "ice", "poison", "flying", "bug"],
    electric: ["ground"],
  };
  const weak: string[] = [];
  types.forEach((t) => {
    if (weaknessMap[t]) weak.push(...weaknessMap[t]);
  });
  return Array.from(new Set(weak));
}
