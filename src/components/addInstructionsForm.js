import React, { useState, useEffect } from "react"
import * as yup from 'yup'
import newInfo from '../validation/newInstructions'
import ParentDiv from '../styles/recipeforms'
import NoteCard from './noteCard'
import video from '../assets/riceVid.mp4'
import axiosWithAuth from '../util/axiosWithAuth'
import NavBar from './navBar'
import { useHistory, useParams } from 'react-router-dom'

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
  const [steps, setSteps] = useState([])
  const history = useHistory()
  const params = useParams()
  const id = params.id

      const postRecipeInfo = (newInstructions) => {
        axiosWithAuth()
      .post(`/recipes/${id}/instructions`, newInstructions)
      .then(res => {
        setInstructions([res.data, ...instructions])
        // setFormValues(initialFormValues)
      })
      .catch(err => {
        console.log(err)
        debugger
      })
  }

  const goHome = () => {
    history.push('/recipes')
  }

      const submit = evt => {
        evt.preventDefault()
        const newInstructions = {instructions: steps}
        postRecipeInfo(newInstructions)
        history.push(`/recipes`)
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

      useEffect(() => {
       console.log(instructions)
      }, [instructions])
      useEffect(() => {
        console.log(steps)
       }, [steps])
     
      const appendStep = evt => {
        evt.preventDefault()
        setSteps([...steps, formValues.instructions.trim()])
        setFormValues(initialFormValues)
      }    

      return(
      <ParentDiv>
        <NavBar/>
         <form onSubmit={submit}>
           <h2>Add instructions!</h2>
         <div id='notePad'>
        {
          steps.map((step, index) => {
            return <NoteCard item={step} index={index}/>
          })
        }
        </div>
        <div className='errors'>
          <div id='titleError'>{formErrors.instructions}</div>
        </div>
        <label htmlFor='instructions'>
            <input
              type='text'
              name='instructions'
              value={formValues.instructions}
              placeholder='Enter a step then press "ADD STEP"'
              onChange={onInputChange}
            ></input>
        </label>
        <button  disabled={disabled} onClick={appendStep} id='appendBtn'>Add Step</button>

        <button onClick={goHome} id='submitBtn'>Submit Instructions</button>
        </form>
        <video id='videoBG' poster='../src/assets/poster.png' autoPlay muted loop>
           <source src={video} type='video/mp4'/>
        </video>
      </ParentDiv>
      )
}

export default Instructions