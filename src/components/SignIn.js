//Kate Roy bw project
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "../Sign.css"
import axios from 'axios'
import * as Yup from 'yup'
import styled from 'styled-components'
import Footer from './Footer'


//STYLED COMPONENTS HERE

const Title = styled.h1`
color:#fce188;
display:flex;
font-size:10rem;
justify-content:center;
margin:0 auto;
`


//INITIAL VALUES
const initialFormValues = {
    username:"",
    password:"",
}
const initialFormErrors = {
    username:"",
    password:"",
}

const initialDisabled = true


//SCHEMA
const formSchema = Yup.object().shape({
    username:Yup
    .string()
    .required('Username is required for sign in'),
    password:Yup
    .string()
    .required('Password is required for sign in')
})

//SIGNIN
export default function SignIn(){

    //STATE
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState([])
    const [disabled, setDisabled] = useState(initialDisabled)
    const { push } = useHistory()
    
    //Eventhandlers
    function changeColour(e){
        e.target.style.color = '#F5855B';
    }
    function changeBack(e){
        e.target.style.color = '#fce188';
    }

    //USEEFFECT
    useEffect(() => {
        formSchema.isValid(formValues).then(valid => {
            setDisabled(!valid)
        })
    },[formValues])


    //VALIDATION
    const validateForm = (evt) => {
        const name = evt.target.name
        const value = evt.target.value
        Yup
        .reach(formSchema, name)
        .validate(value)
        .then((err) => {
            // console.dir(err)
            setFormErrors({
                ...formErrors, [name]: initialFormErrors[name]
            })
        })
        .catch(err => {
            // console.dir(err)
            setFormErrors({
                ...formErrors,[name]: err.message})
        })
    }

    //SUBMIT
    const handleSubmit = (evt) => {
        evt.preventDefault()
        axios
        .post('https://secret-family-recipes-703.herokuapp.com/api/users/signup', formValues)
        .then((res) => {
            console.log('sent')
            setFormValues(initialFormValues)
            push('/recipes')
        })
        .catch((err) => {
            console.log('oh no! it broke:', err.res)
        })
    }

    //INPUT
    const handleChange = (evt) => {
        evt.persist()
        const letMeType = {
			...formValues,
			[evt.target.name]: evt.target.value,
		};
		validateForm(evt);
		setFormValues(letMeType);
    }

    return(
        <div className='signInContainer'>
            <header className='header'>
            <Title>
            <h1 className='title' onMouseEnter={changeColour} onMouseLeave={changeBack}>Sign In</h1>
            </Title>
            </header>
            <div className="signForm">
            <form onSubmit={handleSubmit}>
                <div className='userContainer'>
                <label className="label1" htmlFor='username'>
                    <div className='labelName'>
                    Username:
                    </div>
                    <div className='labelInput'>
                    <input
                    type='text'
                    name='username'
                    placeholder='Create your username'
                    onChange={handleChange}
                    value={formValues.username}
                    />
                    </div>
                </label>
                </div>
                <div className='passContainer'>
                <label className='label2' htmlFor='password'>
                    <div className="labelName">
                    Password:
                    </div>
                    <div className='labelInput'>
                    <input
                    type='password'
                    name='password'
                    placeholder='Create your password'
                    onChange={handleChange}
                    value={formValues.password}
                    />
                    </div>
                </label>
                </div>
                <div className="error">
                {Object.values(formErrors).map(err => {
                    return <p>{err}</p>
                })
                }
                </div>
                <div className="btn">
                <button disabled={disabled} name="submit" href="/recipes">
                    Sign In
                </button>
                </div>
            </form>
            </div>
            <Footer/>
        </div>
    )
}