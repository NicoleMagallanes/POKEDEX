// Pokémon type effectiveness table
const typeChart: Record<string, Record<string, number>> = {
    fire: { water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, ice: 0.5 },
    water: { electric: 2, grass: 2, fire: 0.5, water: 0.5, ice: 0.5 },
    grass: { fire: 2, ice: 2, poison: 2, flying: 2, bug: 2, water: 0.5, ground: 0.5 },
    electric: { ground: 2, electric: 0.5, flying: 0.5 },
    ground: { water: 2, grass: 2, ice: 2, poison: 0.5, rock: 0.5 },
    rock: { water: 2, grass: 2, fighting: 2, steel: 2, ground: 2, fire: 0.5, flying: 0.5 },
    fighting: { flying: 2, psychic: 2, fairy: 2, rock: 0.5, bug: 0.5 },
    fairy: { poison: 2, steel: 2, fighting: 0.5 },
    psychic: { dark: 2, bug: 2, ghost: 2, fighting: 0.5 },
    ice: { fire: 2, rock: 2, fighting: 2, steel: 2, ice: 0.5 },
    dark: { fighting: 2, fairy: 2, bug: 2, dark: 0.5, ghost: 0.5 },
    bug: { fire: 2, flying: 2, rock: 2, ground: 0.5, grass: 0.5 },
    ghost: { ghost: 2, dark: 2, poison: 0.5, bug: 0.5 },
    steel: { fire: 2, fighting: 2, ground: 2, poison: 0 },
    poison: { psychic: 2, ground: 2, fighting: 0.5, bug: 0.5, poison: 0.5 },
    flying: { electric: 2, ice: 2, rock: 2, grass: 0.5, fighting: 0.5 },
    dragon: { ice: 2, dragon: 2, fairy: 2, fire: 0.5, grass: 0.5, water: 0.5 },
};

export function getWeaknesses(types: string[]) {
    const weakness: Record<string, number> = {};

    types.forEach((type) => {
        const chart = typeChart[type];
        if (!chart) return;

        Object.entries(chart).forEach(([targetType, multiplier]) => {
            weakness[targetType] = (weakness[targetType] || 1) * multiplier;
        });
    });

    return Object.entries(weakness)
        .filter(([_, mult]) => mult > 1)
        .map(([type]) => type);
}
