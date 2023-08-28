import React, { useEffect, useState } from "react";
import "./App.css";
import { PokemonCards } from "./components/PokemonCards";
import { getPokemonList, getPokemon } from "./services/Api.js";

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState(null); 
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonSpecial, setPokemonSpecial] = useState([]);
  const [searchTemp, setSearchTemp] = useState(""); // Değişiklik: Boş bir değerle başlatıldı

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
      console.log("clicked")
    } catch (error) {
      console.error("Error fetching selected Pokemon:", error);
    }
  };

  useEffect(() => {
    fetchingGetPokemonList();
  }, []); // work when start app

  // Değişiklik: Arama işlevi
  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTemp(searchText);
  };

  // Filtrelenmiş pokemon listesi
  const filteredPokemonList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTemp));

  return (
    <div className="App">
      <header className="App-header">
        <div className="app">
          <div>
            <textarea onChange={handleSearchChange}></textarea>
          </div>
          {filteredPokemonList.map((filteredPokemon) => {
            const pokemonData = pokemonSpecial.find(item => item.name === filteredPokemon.name);
            const types = pokemonData && pokemonData.types;
            return (
              <PokemonCards
                key={filteredPokemon.name}
                title={filteredPokemon.name}
                height={pokemonData && pokemonData.height}
                weight={pokemonData && pokemonData.weight}
                imageUrl={pokemonData && pokemonData.sprites.front_default}
                types={types && types.map(item => item.type.name)}
                selected={selectedPokemonName !== null ? selectedPokemonName : null}
                onClick={() => handlePokemonClick(filteredPokemon.name)}
              />
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
