import React, {useEffect, useContext} from 'react'
import axiosWithAuth from '../util/axiosWithAuth'
import {useHistory, Link} from 'react-router-dom'
import {RecipeContext} from '../contexts/Context'
import NavBar from './navBar'
import Recipe from './recipeCard'
import Styled from  'styled-components'
import video from '../assets/strawberryVid.mp4'
import SearchBar from './SearchBar'

const RecipesDiv = Styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin: 0 auto 2rem;
max-width: 1100px;
padding: 0 2rem;
#videoBG {
            position: absolute;
            z-index: -1;
            min-height: 50%;
            max-height:100%;
            min-width: 100%;
            /* max-width:100%; */
            /* top: 0; */
            bottom: 0;
            right: 0;
            /* left: 0; */
            padding: none;
            overflow-x: hidden;
            background-repeat: no-repeat;
            background-size: cover;
            /* background-position: center; */
        }
`

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
        <NavBar/>
        <RecipesDiv>
          {
          recipes.map(recipe => {
          return <Recipe recipe={recipe}/>
          })
          }
          <video id='videoBG' poster='../src/assets/strawberry.png' autoPlay muted loop>
            <source src={video} type='video/mp4'/>
          </video>
        </RecipesDiv>

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