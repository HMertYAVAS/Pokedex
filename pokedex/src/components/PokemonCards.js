import React from "react";
import "../css/pokemonCard.css";

export const PokemonCards = ({ title, height, weight, imageUrl,types = [], onClick,selected }) => {
  return (
    <div className={selected === title ? "selectedCard" : "card"} onClick={onClick}>
      <img src={imageUrl} alt="Pokemon Image" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="cardDetails">
          <div className="physical">
            <h6>Physical</h6>
            <p className="card-text">Height: {height}</p>
            <p className="card-text">Weight: {weight}</p>
          </div>
          <div className="special">
            <h6>Special</h6>
            <p className="card-text"> {types[0] != null?types[0]:null}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
