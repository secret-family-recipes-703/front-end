import React, {useContext, useEffect, useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {RecipeContext} from '../contexts/Context'
import axios from 'axios'
import * as yup from 'yup'
import newRecipe from '../validation/newRecipe'
import EditRecipeForm from './EditRecipeForm'
import axiosWithAuth from '../util/axiosWithAuth'

const initialFormValues = {
  name: '',
  source: '',
  category: '',
  imageURL: ''
}
const initialFormErrors = {
    name: '',
    source: '',
    category: '',
    imageURL: ''
  }

  const initialDisabled = true


const EditRecipe = (props) => {

    
  const {recipes, addRecipes} = useContext(RecipeContext)  
    const [recipe, setRecipe] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled)
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([]) 
    const params = useParams()
    const history = useHistory()
    const id = params.id


const postNewRecipe = (id) => {
    axiosWithAuth()
    .put(`/recipes/${id}`)
      .then(res => {
        setRecipe([res.data, ...recipe])
        setFormValues('')
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        debugger
      })
  }

  useEffect(() => {
    axiosWithAuth()
    .get(`/recipes/${id}`)
    .then(res => {
        setFormValues(res.data.data)
  })
  }, [])

  const onInputChange = (event) => {
    const {name} = event.target
    const {value} = event.target
    yup
      .reach(newRecipe, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }
 
    return (
         <div>
             <EditRecipeForm 
             formErrors={formErrors}
             formValues={formValues}
             initialFormValues={recipe}
             onChange={onInputChange}
             disabled={disabled}
             postNewRecipe={postNewRecipe}
             />
             
         </div>
    )
}

export default EditRecipe