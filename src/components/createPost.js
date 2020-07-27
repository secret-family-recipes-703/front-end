import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'

//with title, source, ingredients, instructions, and category), and edit or delete it later
const initialFormValues = {
    title: '',
    source: '',
    ingredients: '',
    instructions: '',
    category: ''
  }
  const initialFormErrors = {
    title: '',
    source: '',
    ingredients: '',
    instructions: '',
    category: '',

  }
  const initialDisabled = true


const createPost = () => {
    const [recipe, setRecipe] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled) 


const postNewPizza = newRecipe => {
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

  const inputChange = evt => {
    const { name, value } = evt.target
    yup
      .reach(formSchema, name)
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

  const submit = evt => {
    evt.preventDefault()
    const newRecipe = {
      title: formValues.title.trim(),
      source: formValues.source.trim(),
      ingreadients: formValues.ingredients.trim(),
      instructions: formValues.instructions.trim(),
      category: formValues.category,
    }
    postNewPizza(newRecipe)
  }
  
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

//with title, source, ingredients, instructions, and category), and edit or delete it later
    return (
         <div>
            <div className='errors'>
                <div id='titleError'>{errors.title}</div>
            </div>
            <form>
                <label htmlFor='title'>
                    <input
                    type='text'
                    name='title'
                    value={formValues.title}
                    placeholder='Enter title of recipe'
                    onChange={inputChange}
                    ></input>
                </label>
                <label htmlFor='source'>
                    <input
                    type='text'
                    name='source'
                    value={formValues.source}
                    placeholder='Enter source of recipe'
                    onChange={inputChange}
                    ></input>
                </label>
                <label htmlFor='ingredients'>
                    <input
                    type='text'
                    name='ingredients'
                    value={formValues.ingredients}
                    placeholder='Enter ingredients for recipe'
                    onChange={inputChange}
                    ></input>
                </label>
                <label htmlFor='instructions'>
                    <input
                    type='text'
                    name='instructions'
                    value={formValues.instructions}
                    placeholder='Enter instructions of recipe'
                    onChange={inputChange}
                    ></input>
                </label>
                <label htmlFor='category'>
                    <select
                    onChange={inputChange}
                    value={formValues.category}
                    name='category'
                    >
                        <option value='' >Food category</option>
                        <option value='pizza' >Pizza</option>
                        <option value='lame' >Not pizza</option>
                    </select>
                </label>

                <button disabled={disabled} id='submitBtn'>Add Recipe</button>

            </form>


         </div>
    )
}


export default createPost