export async function fetchPokemonCategory(pokemonName: string): Promise<string> {
    try {
        const speciesName = pokemonName.toLowerCase().split('-')[0]; // normalize form names
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}`);
        const data = await res.json();

        // Ultra Beast check first
        if (data.is_ultra_beast) return "Ultra Beast";

        if (data.is_baby) return "Baby";
        if (data.is_legendary) return "Legendary";
        if (data.is_mythical) return "Mythical";

        // Exceptions for known special Pokémon
        const exceptions: Record<string, string> = {
            shaymin: "Mythical",
            thundurus: "Legendary",
            tornadus: "Legendary",
            landorus: "Legendary",
            zekrom: "Legendary",
            reshiram: "Legendary",
            kyurem: "Legendary",
            mew: "Mythical",
            mewtwo: "Legendary",
        };
        if (exceptions[speciesName]) return exceptions[speciesName];

        // Starter check
        const starters = ["bulbasaur", "charmander", "squirtle"];
        if (starters.includes(speciesName)) return "Starter";

        // Fossil check via egg groups
        const fossilEggGroups = data.egg_groups.map((g: any) => g.name);
        if (fossilEggGroups.includes("mineral")) return "Fossil";

        return "Normal";
    } catch {
        return "Unknown";
    }
}
