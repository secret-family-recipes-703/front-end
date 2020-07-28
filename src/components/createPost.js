import React, { useState, useEffect } from "react"
import axios from 'axios'
import * as yup from 'yup'
import newRecipe from '../validation/newRecipe'
import Form from './createPostForm'

const initialFormValues = {
    title: '',
    source: '',
    category: '',
    src: ''
  }
  const initialFormErrors = {
    title: '',
    source: '',
    category: '',
    src: ''
  }
  const initialDisabled = true


const CreatePost = (props) => {
    const [recipe, setRecipe] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled) 

const postNewRecipe = newRecipe => {
    axios.post('https://secret-family-recipes-703.herokuapp.com/api/recipes', newRecipe)
      .then(res => {
        setRecipe([res.data, ...recipe])
        setFormValues(initialFormValues)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        debugger
      })
  }

  const inputChange = ( name, value ) => {
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
 
  useEffect(() => {
    newRecipe.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

    return (
         <div>
             <Form 
             formErrors={formErrors}
             formValues={formValues}
             disabled={disabled}
             inputChange={inputChange}
             postNewRecipe={postNewRecipe}
             />
         </div>
    )
}

export default CreatePost