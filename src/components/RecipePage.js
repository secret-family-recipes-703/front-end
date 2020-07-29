import React, {useContext, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {RecipeContext} from '../contexts/Context'
import axiosWithAuth from '../util/axiosWithAuth'
import Styled from  'styled-components'
import NavBar from './navBar'

const RecipeSoloDiv = Styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    min-width: 250px;
    max-width: 350px;
    margin: 5% 42%;
    /* border: 3px solid #E81B23; */
    border-radius: 20px;
    background-color: rgba(74, 198, 215, 0.7);
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Poppins;
    img{
        width:100%;
        border-radius: 20px;
        height: 200px
    }
`

const RecipePage = () => {
  const {recipes, addRecipes} = useContext(RecipeContext)
  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState([])
  const [instructions, setInstructions] = useState([])
  const params = useParams()
  const history = useHistory()
  const id = params.id

  useEffect(() => {
    console.log("this is working")
    axiosWithAuth()
    .get(`/recipes/${id}/ingredients`)
    .then(res => {
      console.log(res)
      setIngredients(res.data.data)
      axiosWithAuth()
      .get(`/recipes/${id}/instructions`)
      .then(res => {
        console.log(res)
        setInstructions(res.data.data)
      })
      axiosWithAuth()
      .get(`/recipes/${id}`)
      .then(res => {
        console.log(res)
        setRecipe(res.data.data)
      })
    })
  }, [])

  const deleteRecipe = (id) => {
    axiosWithAuth()
    .delete(`/recipes/${id}`)
    .then((res) => {
      history.push('/recipes')
    })
  }

  return (
    <div>
    <NavBar />
    <RecipeSoloDiv>
      <div id='image-container'>
        <img alt="recipe pic" src={recipe.imageURL} />
      </div>
      <h2>{recipe.name} </h2>
      <p>Category: {recipe.category}</p>
      <p>Source: {recipe.source}</p>
      <ul>{ingredients.map(ingredient => <li>{ingredient.ingredient}</li>)}</ul>
      <ol>{instructions.map(instruction => <li>{instruction.instruction}</li>)}</ol>
      <button onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</button>
    </RecipeSoloDiv>
    </div>
  )

}

export default RecipePage