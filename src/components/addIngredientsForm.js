import React, { useState, useEffect } from "react"
import axios from 'axios'
import * as yup from 'yup'
import newInfo from '../validation/newIngredients'


const initialFormValues = {ingredients: ''}
const initialFormErrors = {ingredients: ''}
const initialDisabled = true

const Ingredients = props => {
  const [ingredients, setIngredients] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled) 

  const postRecipeInfo = (newIngredients) => {
    axios.post('https://reqres.in/api/users', newIngredients)
      .then(res => {
        setIngredients([res.data, ...ingredients])
        setFormValues(initialFormValues)
        // console.log(res.data)
        console.log(ingredients)
      })
      .catch(err => {
        console.log(err)
        debugger
      })
    }

    const submit = evt => {
        evt.preventDefault()
        const newIngredients = {ingredients: formValues.ingredients.trim()}
        postRecipeInfo(newIngredients)
      }
    
      const onInputChange = evt => {
        const { name, value } = evt.target
        yup
        .reach(newInfo, name)
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

      useEffect(() => {
        newInfo.isValid(formValues).then(valid => {
          setDisabled(!valid)
        })
      }, [formValues])
    

      return(
        <div>

        <form onSubmit={submit}>
          <label htmlFor='ingredients'>
              <input
                type='text'
                name='ingredients'
                value={formValues.ingredients}
                placeholder='Enter ingredients for recipe'
                onChange={onInputChange}
              ></input>
          </label>
          
          <button id='submitBtn'>Submit Ingredients</button>
        </form>
      
        </div>
      )
}

export default Ingredients