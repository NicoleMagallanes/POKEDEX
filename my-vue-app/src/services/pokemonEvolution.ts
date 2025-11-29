// Fetch evolution chain for a Pokémon by name
export async function fetchEvolutions(pokemonName: string): Promise<string[]> {
    try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        const speciesData = await speciesRes.json();

        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoList: string[] = [];
        let current = evoData.chain;

        while (current) {
            evoList.push(current.species.name);
            current = current.evolves_to[0];
        }

        return evoList;
    } catch {
        return [];
    }
}
