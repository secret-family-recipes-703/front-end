import React, {useEffect, useContext, useState} from 'react'
import axiosWithAuth from '../util/axiosWithAuth'
import {RecipeContext} from '../contexts/Context'

const Recipes = () => {

  const {recipes, addRecipes} = useContext(RecipeContext)

  useEffect(() => {
    axiosWithAuth()
    .get('/recipes')
    .then(res => {
      addRecipes(res.data.data)
    })
  }, [])

    return (
      <div>
      <a href='/new'>Add a New Recipe</a>
      <ul>
        {recipes.map(recipe => 
        <ul>
          {recipe.name} // {recipe.category} // {recipe.source} <img src={recipe.imageURL} />
        </ul>)}
      </ul>
      </div>
    )
}

export default Recipes