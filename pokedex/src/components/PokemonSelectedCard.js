import React from "react";

export const PokemonSelectedCard= ({
    title,
    height,
    weight,
    imageUrl,
    types = [],
    onClick,
    selected,
  }) =>{
    return(
        <div
      className={
        selected === title
          ? " bg-green-400 border-2 rounded-md w-36 "
          : "grid bg-slate-500 border-2 border-slate-400 rounded-md w-36"
      }
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <img src={imageUrl} alt="Pokemon Image" className="w-full h-auto" />
        <div className="flex justify-center my-1">
          <h2 className="text-lg uppercase text-slate-950 font-mono ">{title}</h2>
        </div>
      </div>
    </div>
    )
}