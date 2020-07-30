import React, { useState, useEffect } from "react"
import * as yup from 'yup'
import newInfo from '../validation/newIngredients'
import ParentDiv from '../styles/recipeforms'
import NoteCard from './noteCard'
import video from '../assets/riceVid.mp4'
import { useHistory, useParams } from 'react-router-dom'
import NavBar from './navBar'
import axiosWithAuth from '../util/axiosWithAuth'

const initialFormValues = {ingredients: ''}
const initialFormErrors = {ingredients: ''}
const initialDisabled = true

const Ingredients = props => {
  const [ingredients, setIngredients] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled) 
  const [list, setList] = useState([])
  const history = useHistory()
  const params = useParams()
  const id = params.id

  const postRecipeInfo = (newIngredients) => {
    axiosWithAuth()
    .post(`/recipes/${id}/ingredients`, newIngredients)
      .then(res => {
        setIngredients([res.data, ...ingredients])
      })
      .catch(err => {
        console.log(err)
        debugger
      })
    }

    const submit = evt => {
        evt.preventDefault()
        const newIngredients = {ingredients: list}
        postRecipeInfo(newIngredients)
        history.push(`/instructions/${id}`)
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
      
       const appendStep = evt => {
         evt.preventDefault()
         setList([...list, formValues.ingredients.trim()])
         setFormValues(initialFormValues)
       }    

      return(
        <ParentDiv>
        <NavBar/>
        <form onSubmit={submit}>
        <h2>Add ingredients!</h2>
        <div id='notePad'>
          {
            list.map((item, index) => {
              return <NoteCard item={item} index={index}/>
            })
          }
          </div>
            <div className='errors'>
                <div id='titleError'>{formErrors.ingredients}</div>
            </div>
          <label htmlFor='ingredients'>
              <input
                type='text'
                name='ingredients'
                value={formValues.ingredients}
                placeholder='Enter an ingredient for recipe'
                onChange={onInputChange}
              ></input>
          </label>
        <button  disabled={disabled} onClick={appendStep} id='appendBtn'>Add ingredient</button>
          
          <button id='submitBtn'>Submit Ingredients</button>
        </form>
        <video id='videoBG' poster='../src/assets/poster.png' autoPlay muted loop>
            <source src={video} type='video/mp4'/>
        </video>
        </ParentDiv>
      )
}

export default Ingredients