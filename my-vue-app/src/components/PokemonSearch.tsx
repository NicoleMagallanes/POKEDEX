import { useState, useEffect, useRef } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export default function PokemonSearch({ onSearch }: Props) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch all Pokémon names once
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        setAllPokemon(data.results.map((p: any) => p.name));
      });
  }, []);

  // Filter suggestions as user types
  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const filtered = allPokemon.filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [value, allPokemon]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.toLowerCase());
    setSuggestions([]);
  };

  const handleSuggestionClick = (name: string) => {
    setValue(name);
    onSearch(name.toLowerCase());
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Search Pokémon name or ID..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
            flex-1 px-4 py-2 rounded-xl 
            bg-white/90 
            focus:ring-4 focus:ring-yellow-300 
            outline-none text-gray-800 font-medium
            shadow-md
          "
        />
        <button
          type="submit"
          className="
            bg-yellow-400 
            hover:bg-yellow-500 
            transition-all 
            px-4 py-2 
            rounded-xl 
            font-bold 
            shadow-md text-gray-900
          "
        >
          Go
        </button>
      </form>

      {/* Dropdown */}
      {suggestions.length > 0 && (
        <ul
          className="
            absolute top-full left-0 w-full z-50 
            mt-1 bg-white rounded-xl shadow-lg 
            max-h-60 overflow-auto
            ring-1 ring-gray-300
          "
        >
          {suggestions.map((name) => (
            <li
              key={name}
              onClick={() => handleSuggestionClick(name)}
              className="px-4 py-2 cursor-pointer hover:bg-yellow-100 capitalize"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
