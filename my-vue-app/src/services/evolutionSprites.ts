// utils/evolutionSprites.ts

// Convert Pokémon name to its Pokédex ID (for evolution sprites)
export function getPokemonSpriteUrl(name: string, currentPokemon: any, evolutions: string[]): string {
  // If the name matches the current Pokémon, use its official ID
  if (currentPokemon.name === name) {
    return currentPokemon.sprites.front_default;
  }

  // Try to guess ID from the evolutions array
  const evoIndex = evolutions.findIndex((n) => n === name);
  const currentIndex = evolutions.findIndex((n) => n === currentPokemon.name);

  if (evoIndex !== -1 && currentIndex !== -1 && currentPokemon.id) {
    const id = currentPokemon.id - currentIndex + evoIndex;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  // Fallback to official static mapping for common Pokémon
  const staticMap: Record<string, number> = {
    bulbasaur: 1,
    ivysaur: 2,
    venusaur: 3,
    charmander: 4,
    charmeleon: 5,
    charizard: 6,
    squirtle: 7,
    wartortle: 8,
    blastoise: 9,
    // ... add more if needed
  };

  const id = staticMap[name.toLowerCase()] || 1;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
