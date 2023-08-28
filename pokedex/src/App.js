import React, { useEffect, useState } from "react";
import "./App.css";
import { PokemonCards } from "./components/PokemonCards";
import { getPokemonList, getPokemon } from "./services/Api.js"; // ".js" uzantısını kaldırdım

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Başlangıçta seçili Pokemon yok
  const [selectedPokemonName, setSelectedPokemonName] = useState(null); 
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonSpecial, setPokemonSpecial] = useState([]);

  const fetchingGetPokemonList = async () => {
    try {
      // Pokemon API List
      const data = await getPokemonList(100);
      setPokemonList(data);

      //Pokemon icons API
      const special = await Promise.all(
        data.map(async (pokemon) => {
          const pokemonData = await getPokemon(pokemon.name);
          return pokemonData;
        })
      );
      setPokemonSpecial(special);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  const handlePokemonClick = async (pokemonName) => {
    try {
      // Seçilen Pokemon'u API'den al
      const selected = await getPokemon(pokemonName);
      setSelectedPokemonName(pokemonName);
      setSelectedPokemon(selected);
      console.log("clicked")
    } catch (error) {
      console.error("Error fetching selected Pokemon:", error);
    }
  };

  useEffect(() => {
    fetchingGetPokemonList();
  }, []); // work when start app

  return (
<div className="App">
      <header className="App-header">
        <div className="app">
          {          
            pokemonList &&
            pokemonList.map((pokemon, key) => {
              const types = pokemonSpecial[key] && pokemonSpecial[key].types;
              return (
                <PokemonCards
                  key={key}
                  title={pokemon.name}
                  height={
                    pokemonSpecial[key] && pokemonSpecial[key].height
                  }
                  weight={
                    pokemonSpecial[key] && pokemonSpecial[key].weight
                  }
                  imageUrl={pokemonSpecial[key] && pokemonSpecial[key].sprites.front_default}
                  types={types && types.map(item => item.type.name)}
                  selected={selectedPokemonName!=null?selectedPokemonName:null}
                  onClick={() => handlePokemonClick(pokemon.name)}
                />
              );
            })}
        </div>
      </header>
    </div>
  );
}

export default App;
