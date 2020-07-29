import React, {useEffect, useContext} from 'react'
import axiosWithAuth from '../util/axiosWithAuth'
import {useHistory, Link} from 'react-router-dom'
import {RecipeContext} from '../contexts/Context'
import SearchBar from './SearchBar'

import '../styles/recipeList.css'

const Recipes = (props) => {

  // const {searchValue} = useContext(RecipeContext)
  const {recipes, addRecipes} = useContext(RecipeContext)
  const {push} = useHistory()

  function routeToRecipe(ev, recipe) {
    ev.preventDefault();
    props.history.push(`/recipe/${recipe.id}`);
  }

  useEffect(() => {
    axiosWithAuth()
    .get('/recipes')
    .then(res => {
      addRecipes(res.data.data)
    })
  }, [addRecipes])

    return (
      <div>
      <SearchBar />
      <a href='/create'>Add a New Recipe</a>
      <div className="recipeContainer">
        {recipes.map(recipe => 
          <div className="recipeCard" key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <img alt="recipe pic" src={recipe.imageURL}/>
          </Link>
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
        )}
        </div>
      </div>
    )
}

export default Recipes