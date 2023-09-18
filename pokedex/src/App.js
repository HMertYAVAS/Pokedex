import React, { useEffect, useState } from "react";
import "./App.css";
import { PokemonCards } from "./components/PokemonCards";
import { PokemonSelectedCard } from "./components/PokemonSelectedCard";
import { getPokemon, getPokemonList } from "./services/api.js";

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonSpecial, setPokemonSpecial] = useState([]);
  const [searchTemp, setSearchTemp] = useState(""); // Değişiklik: Boş bir değerle başlatıldı
  const [selectedPokemonData, setSelectedPokemonData] = useState({});

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
      setSelectedPokemonData(selected);
      setSelectedPokemonName(pokemonName);
      console.log(pokemonName);
      // console.log(selected)
    } catch (error) {
      console.error("Error fetching selected Pokemon:", error);
    }
  };

  useEffect(() => {
    document.title = "Pokedex";
    fetchingGetPokemonList();
  }, []); // work when start app

  // Değişiklik: Arama işlevi
  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTemp(searchText);
  };

  // Filtrelenmiş pokemon listesi
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTemp)
  );

  return (
    <div
      className=" bg-slate-600  mx-auto  shadow-md overflow-hidden "
      style={{ minHeight: "100vh" }}
    >
      {/* SearchBar*/}
      <div className="flex justify-center my-5 ">
        <input
          className="grow-0 basis-1/4 text-center border-2  rounded-lg outline-none border-zinc-400 focus:border-green-600"
          type="text"
          placeholder="Search Pokemon.."
          onChange={handleSearchChange}
        />
      </div>
      {/* ---------- */}

      {/* Body */}
      <div className=" container flex">
        {/* PokemonCards */}
        <div className="flex overflow-y-scroll overflow-x-hidden mx-5 " style={{ height: 600 }}>
          <div className="grid gap-4 grid-cols-4  ">
            {filteredPokemonList.map((filteredPokemon) => {
              const pokemonData = pokemonSpecial.find(
                (item) => item.name === filteredPokemon.name
              );
              const types = pokemonData && pokemonData.types;
              return (
                <PokemonCards
                  key={filteredPokemon.name}
                  title={filteredPokemon.name}
                  height={pokemonData && pokemonData.height}
                  weight={pokemonData && pokemonData.weight}
                  imageUrl={pokemonData && pokemonData.sprites.front_default}
                  types={types && types.map((item) => item.type.name)}
                  selected={
                    selectedPokemonName !== null ? selectedPokemonName : null
                  }
                  onClick={() => handlePokemonClick(filteredPokemon.name)}
                />
              );
            })}
          </div>
        </div>
        {/* -------------- */}

        {/* Selected Pokemon  */}
        <div className="flex items-center">
          <div className="ml-64">
            {console.log(selectedPokemonData)}
            {selectedPokemonData.sprites && (
              <PokemonSelectedCard
                key={selectedPokemonName}
                title={selectedPokemonName}
                height={selectedPokemonData.height}
                weight={selectedPokemonData.weight}
                imageUrlFront={selectedPokemonData.sprites.front_default}
                imageUrlBack={selectedPokemonData.sprites.back_default}
                firstType={selectedPokemonData.types[0].type.name}
              />
            )}
          </div>
        </div>
        {/* -------------- */}
      </div>
      {/* ---------- */}
    </div>
  );
}

export default App;
