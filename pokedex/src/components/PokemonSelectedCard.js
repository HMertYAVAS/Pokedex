import React from "react";

export const PokemonSelectedCard = ({
  title,
  height,
  weight,
  imageUrlFront,
  imageUrlBack,
  firstType,
  onClick,
  selected,
}) => {


  function getPokemonTypeColor(type) {
    switch (type) {
      case "normal":
        return "gray";
      case "fire":
        return "red";
      case "water":
        return "blue";
      case "electric":
        return "yellow";
      case "grass":
        return "green";
      case "ice":
        return "lightblue";
      case "fighting":
        return "orange";
      case "poison":
        return "purple";
      case "ground":
        return "brown";
      case "flying":
        return "skyblue";
      case "psychic":
        return "pink";
      case "bug":
        return "green";
      case "rock":
        return "brown";
      case "ghost":
        return "purple";
      case "dark":
        return "black";
      case "steel":
        return "gray";
      case "fairy":
        return "pink";
      default:
        return "gray"; // Bilinmeyen tip için varsayılan renk
    }
  }
  

  return (
    <div
      className={
        selected === title
          ? " bg-green-400 border-2 rounded-md w-96 h-96"
          : "grid bg-slate-500 border-2 border-slate-400 rounded-md w-96 h-96"
      }
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div>
          <div className="flex flex-row">
            <img src={imageUrlFront} alt="Pokemon Image" className="w-auto h-36" />
            <img src={imageUrlBack} alt="Pokemon Image" className="w-auto h-36" />
          </div>
          <div className="flex justify-center my-1 divide-y-2">
            <h2 className="text-lg uppercase text-slate-950 font-mono mb-1 ">{title}</h2>
          </div>
        </div>
        <div className="flex flex-row">
          <h3 className="text-sm uppercase text-slate-950 font-mono w-20 text-center rounded mb-3" style={{backgroundColor:getPokemonTypeColor(firstType)}}>{firstType}</h3>
        </div>
        <div className="flex flex-row">
          <h3 className="text-sm uppercase text-slate-950 font-mono">Height: </h3>
          <h3 className="text-sm uppercase text-slate-950 font-mono ">{height}ft</h3>
        </div>
        <div className="flex flex-row">
          <h3 className="text-sm uppercase text-slate-950 font-mono">Weight: </h3>
          <h3 className="text-sm uppercase text-slate-950 font-mono ">{weight}kg</h3>
        </div>
      </div>
    </div>
  )
}