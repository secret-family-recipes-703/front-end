import React from 'react'
import axiosWithAuth from '../util/axiosWithAuth'
import Recipes from './Recipes'

export default function Placeholder () {
  
  const getRecipes = (event) => {
		event.preventDefault();
		axiosWithAuth()
			.get("/recipes")
			.then((response) => {
        console.log("success");
        console.log(response)
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
  
  return (
    <>
      <button onClick={getRecipes}> Get Recipes </button>
      <Recipes />
    </>
  )
}