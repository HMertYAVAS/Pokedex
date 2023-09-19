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
  stats
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
        "grid  border-2 bg-slate-500 border-slate-100 rounded-md w-96"
      }
      style={{ height: 600 }}
      onClick={onClick}
    >
      {/* Pokemon Images */}
      <div className="flex flex-col">
        <div className="self-center">
          <div className="flex flex-row border-b-4 rounded-lg border-slate-300">
            <img src={imageUrlFront} alt="Pokemon Image" className="w-auto h-36" />
            <img src={imageUrlBack} alt="Pokemon Image" className="w-auto h-36" />
          </div>
          <div className="flex justify-center divide-y-2 flex-5  bg-slate-300 text-center rounded-md my-5 ">
            <h2 className="text-2xl uppercase text-slate-950 font-mono mb-1 ">{title}</h2>

          </div>
        </div>

        {/* Pokemon Types */}
        <div className="flex flex-row self-center">
          <h3 className="text-sm uppercase text-slate-950 font-mono w-20 text-center rounded mb-3" style={{ backgroundColor: getPokemonTypeColor(firstType) }}>{firstType}</h3>
        </div>

        <div className="">

          {/* Height And Weight Values */}
          <div className="flex flex-row justify-center">
            <p className="text-base  text-slate-950 font-mono">Height:</p>
            <p className="text-sm  text-slate-50 font-mono mr-5 mt-0.5 ">{height}ft</p>

            <p className="text-base  text-slate-950 font-mono">Weight:</p>
            <p className="text-sm  text-slate-50 font-mono mt-0.5">{weight}lb</p>
          </div>

          {/* Specials */}
          <div className="flex flex-row justify-center mt-3">
            <p className="text-lg">Stats</p>
          </div>

          <hr className="border-t-2 border-slate-900 w-48 mx-auto mb-1" />
          <div className="flex flex-col ml-24 ">

            {
              stats.map((item, index) => {
                return (
                  <div className="flex flex-row justify-start items-start" key={index}>
                    <p className="text-base uppercase text-slate-950 font-mono">
                      {stats[index].stat.name.replace(/-/g, " ")}:
                    </p>
                    <p className="text-sm text-slate-50 font-mono mt-0.5">{stats[index].base_stat}</p>
                  </div>
                );
              })
            }

          </div>
        </div>
      </div>
    </div >
  )
}