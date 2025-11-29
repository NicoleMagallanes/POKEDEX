# Nix Pokedex

A Pokémon information viewer built with **Vite + React + TypeScript**, showing types, weaknesses, base stats, moves, and evolution chains. 

## Features

- Display Pokémon sprite, types, weaknesses, and base stats.
- Show Level-Up and Egg moves.
- Fetch and display full evolution chains.
- Clickable evolutions to navigate between Pokémon.

## Demo

<img width="1730" height="1706" alt="image" src="https://github.com/user-attachments/assets/e7d58cd9-e1d0-4f7f-b8fb-74f57b87ac3d" />


## Technologies & Dependencies

- **[Vite](https://vitejs.dev/)** – Fast development build tool  
- **[React](https://reactjs.org/)** – Front-end framework  
- **[TypeScript](https://www.typescriptlang.org/)** – Type safety  
- **[Tailwind CSS](https://tailwindcss.com/)** – Styling and responsive design  
- **[React Hooks](https://reactjs.org/docs/hooks-intro.html)** – `useState`, `useEffect`  
- **[Pokemon API](https://pokeapi.co/docs/v2** – For fetching Pokémon data  

### Tailwind CSS Setup for Vite
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
````

### Vite + React + TypeScript Setup

```bash
npm create vite@latest my-app
# Select React + TypeScript
cd my-app
npm install
npm run dev
```

## API Used

* **[PokéAPI v2](https://pokeapi.co/docs/v2)** – Free public Pokémon API

Endpoints used:

* `https://pokeapi.co/api/v2/pokemon/{name}` – Pokémon details, moves, sprites, stats, types
* `https://pokeapi.co/api/v2/pokemon-species/{name}` – Species info (e.g., legendary, mythical, ultra-beast flags, evolution chain)
* `https://pokeapi.co/api/v2/evolution-chain/{id}` – Evolution chain data

## Project Structure

```
src/
├─ components/
│  ├─ PokemonCard.tsx
│  ├─ PokemonSearch.tsx
├─ services/
│  ├─ pokemonEvolution.ts
│  ├─ evolutionSprites.ts
│  ├─ pokemonApi.ts
│  ├─ pokemonCategory.ts (not finished)
├─ utils/
│  ├─ typeWeakness.ts
├─ App.tsx
├─ main.tsx
```

## Installation & Usage

1. Clone the repo:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

