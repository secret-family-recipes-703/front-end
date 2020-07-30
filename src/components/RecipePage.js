import React, {useContext, useEffect, useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {RecipeContext} from '../contexts/Context'
import axiosWithAuth from '../util/axiosWithAuth'
import Styled from  'styled-components'
import NavBar from './navBar'
import video from '../assets/riceVid.mp4'

const RecipeSoloDiv = Styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    min-width: 250px;
    max-width: 350px;
    margin: 2% 42%;
    /* border: 3px solid #E81B23; */
    border-radius: 20px;
    background-color: rgba(74, 198, 215, 0.7);
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Poppins;
    font-size: 3rem;
    img{
        width:100%;
        border-radius: 20px;
        height: 200px
    }
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
      <div>{recipe.name} </div>
      <div>Category: {recipe.category}</div>
      <div>Source: {recipe.source}</div>
      <ul>{ingredients.map(ingredient => <li>{ingredient.ingredient}</li>)}</ul>
      <ol>{instructions.map(instruction => <li>{instruction.instruction}</li>)}</ol>
      <button onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</button>
      <Link to={`/editRecipe/${recipe.id}`}>Edit Recipe</Link>
      <video id='videoBG' poster='../src/assets/poster.png' autoPlay muted loop>
        <source src={video} type='video/mp4'/>
      </video>
    </RecipeSoloDiv>
    </div>
  )

}

export default RecipePage