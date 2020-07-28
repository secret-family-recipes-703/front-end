import React, { useState, useEffect } from "react"
import axios from 'axios'
import * as yup from 'yup'
import newRecipe from '../validation/newRecipe'
import Form from './createPostForm'

//with title, source, ingredients, instructions, and category), and edit or delete it later
const initialFormValues = {
    title: '',
    source: '',
    // ingredients: '',
    // instructions: '',
    category: ''
  }
  const initialFormErrors = {
    title: '',
    source: '',
    // ingredients: '',
    // instructions: '',
    category: '',

  }
  const initialDisabled = true


const CreatePost = (props) => {
// export default function CreatePost(props){
    const [recipe, setRecipe] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled) 

const postNewRecipe = newRecipe => {
    axios.post('https://reqres.in/api/users', newRecipe)
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

//   const submit = evt => {
//     evt.preventDefault()
//     const newRecipe = {
//       title: formValues.title.trim(),
//       source: formValues.source.trim(),
//       ingreadients: formValues.ingredients.trim(),
//       instructions: formValues.instructions.trim(),
//       category: formValues.category,
//     }
//     postNewRecipe(newRecipe)
//   }
  
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