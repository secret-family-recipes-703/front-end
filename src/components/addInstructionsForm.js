import React, { useState, useEffect } from "react"
import axios from 'axios'
import * as yup from 'yup'
import newInfo from '../validation/newInstructions'


const initialFormValues = {
  instructions: '',
}
const initialFormErrors = {
  instructions: '',
}
const initialDisabled = true

const Instructions = props => {
  const [instructions, setInstructions] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled) 

      const postRecipeInfo = (newInstructions) => {
      axios.post('https://reqres.in/api/users', newInstructions)
      .then(res => {
        setInstructions([res.data, ...instructions])
        setFormValues(initialFormValues)
        // console.log(res.data)
        console.log(instructions)
      })
      .catch(err => {
        console.log(err)
        debugger
      })
  }

    const submit = evt => {
        evt.preventDefault()
        const newInstructions = {instructions: formValues.instructions.trim()}
        postRecipeInfo(newInstructions)
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
          <label htmlFor='instructions'>
              <input
                type='text'
                name='instructions'
                value={formValues.instructions}
                placeholder='Enter instructions for recipe'
                onChange={onInputChange}
              ></input>
          </label>

          <button  id='submitBtn'>Submit Instructions</button>
        </form>
        </div>
      )
}

export default Instructions