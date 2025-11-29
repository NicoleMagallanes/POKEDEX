export async function getPokemon(nameOrId: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
    if (!res.ok) throw new Error("Pokemon not found");
    return res.json();
}
