import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "./Constant";

export const getPokemonList = async (quantity) => {
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

export const getPokemon = async (name) => {
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


