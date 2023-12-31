import React from "react";

export const PokemonCards = ({
  title,
  height,
  weight,
  imageUrl,
  types = [],
  onClick,
  selected,
}) => {
  return (
    <div
      className={
        selected === title
          ? " bg-green-400 border-2 rounded-md w-36 h-48 "
          : "grid bg-slate-500 border-2 border-slate-100 rounded-md w-36 h-48"
      }
      onClick={onClick}
    >
      <div className="items-center">
        <div >
          <img src={imageUrl} alt="Pokemon Image" className="w-full h-36" />
        </div>
        <div className="flex-5 my-1 bg-slate-300 text-center"  >
          <h2 className="text-lg uppercase text-slate-950 font-mono ">{title}</h2>
        </div>
      </div>
    </div>
  );
};
