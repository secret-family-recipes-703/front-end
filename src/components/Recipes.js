import React, {useEffect, useContext} from 'react'
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
  }, [addRecipes])

    return (
      <div>
      <a href='/create'>Add a New Recipe</a>
      <ul>
        {recipes.map(recipe => 
        <ul>
          {recipe.name} - {recipe.category} - {recipe.source} <img alt="recipe pic" src={recipe.imageURL} />
        </ul>)}
      </ul>
      </div>
    )
}

export default Recipes