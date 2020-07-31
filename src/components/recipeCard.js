import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {RecipeContext} from '../contexts/Context'
import axiosWithAuth from '../util/axiosWithAuth'

const RecipeCard = () => {
  const {recipes, addRecipes} = useContext(RecipeContext)
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])
  const params = useParams()
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
    })
  }, [])

  return (
    <div>
      {ingredients.map(ingredient => <div>{ingredient.ingredient}</div>)}
      {instructions.map(instruction => <div>{instruction.instruction}</div>)}
    </div>
  )

}

export default RecipeCard