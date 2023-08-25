import React from 'react'
import axios from 'axios'
import constants from './constants'


const api = () => {

    const getPokemonList = async (quantity) =>{
        const response=await axios.get(constants.MAIN_API)
        console.log(response);
    }


  return (
    <div>
       {getPokemonList()} 
    </div>
  )
}

export default api