import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "./Constant";

const Api = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const getPokemonList = async (quantity) => {
    try {
      const response = await axios.get(
        Constants.MAIN_API + "pokemon?limit=" + quantity + "&offset=0"
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      return [];
    }
  };

  const getPokemon = async (name) => {
    try {
      const response = await axios.get(
        Constants.MAIN_API + "pokemon/" + name.toLowerCase()
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const list = await getPokemonList(10);
      setPokemonList(list);

      // Her Pokemon için detayları çek ve güncelle
      const updatedList = await Promise.all(
        list.map(async (pokemon) => {
          const detail = await getPokemon(pokemon.name);
          return { ...pokemon, detail };
        })
      );
      setPokemonList(updatedList);
    };
    fetchData();
  }, []);

  return (
    <div>
      {pokemonList.map((pokemon, index) => (
        <div key={index}>
          <p>{pokemon.name}</p>
          <p>{pokemon.detail && pokemon.detail.height}</p>
          <p>{pokemon.detail && pokemon.detail.weight}</p>

          {/* Diğer detaylar */}
        </div>
      ))}
    </div>
  );
};

export default Api;
