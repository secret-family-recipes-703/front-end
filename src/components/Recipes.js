import React, {useEffect, useContext} from 'react'
import axiosWithAuth from '../util/axiosWithAuth'
import {useHistory} from 'react-router-dom'
import {RecipeContext} from '../contexts/Context'
import SearchBar from './SearchBar'

import '../styles/recipeList.css'

const Recipes = () => {

  // const {searchValue} = useContext(RecipeContext)
  const {recipes, addRecipes, searchValue} = useContext(RecipeContext)
  const {push} = useHistory()

  const recipeDetails = () => {
    push(`/recipe${recipes.id}`)
  }

  useEffect(() => {
    axiosWithAuth()
    .get('/recipes')
    .then(res => {
      addRecipes(res.data.data)
    })
  }, [])

    return (
      <div>
      <SearchBar />
      <a href='/create'>Add a New Recipe</a>
      <ul>
        {recipes.map(recipe => 
        <div className="recipeContainer">
          <div className="recipeCard">
          <img alt="recipe pic" src={recipe.imageURL} onClick={recipeDetails}/>
            <br />
            <button>View Ingredients + Instructions</button>
            <br />
            {recipe.name}
            <br />
            Category: {recipe.category}
            <br />
            by: {recipe.source}
            <br />
            <button>Edit Recipe</button>
            <button>Delete Recipe</button>
          </div>
        </div>
        )}
      </ul>
      </div>
    )
}

export default Recipes