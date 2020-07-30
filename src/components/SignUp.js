//Kate Roy bw project
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "../Sign.css"
import '../Footer.css'
import axios from 'axios'
import * as Yup from 'yup'
import styled from 'styled-components'
import Footer from './Footer'

//STYLED COMPONENT HERE

const Title = styled.h1`
color:#fce188;
display:flex;
font-size:10rem;
justify-content:center;
margin:0 auto;
`

const initialFormValues = {
    username:"",
    password:"",
}
const initialFormErrors = {
    username:"",
    password:"",
}

const initialDisabled = true

const formSchema = Yup.object().shape({
    username:Yup
    .string()
    .required('Username is required'),
    password:Yup
    .string()
    .min(5, 'Password must contain at least 5 characters')
    .required('Password is required')
})

export default function SignUp(){
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState([])
    const [disabled, setDisabled] = useState(initialDisabled)
    const { push } = useHistory()

    function changeColour(e){
        e.target.style.color = '#F5855B';
    }
    function changeBack(e){
        e.target.style.color = '#fce188';
    }

    useEffect(() => {
        formSchema.isValid(formValues).then(valid => {
            setDisabled(!valid)
        })
    },[formValues])


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

    const handleSubmit = (evt) => {
        evt.preventDefault()
        axios
        .post('https://secret-family-recipes-703.herokuapp.com/api/users/signup', formValues)
        .then((res) => {
            console.log('sent')
            setFormValues(initialFormValues)
            push('/sign-in')
        })
        .catch((err) => {
            console.log('oh no! it broke:', err.res)
        })
    }

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
        <div className='signUpContainer'>
            <header className='header'>
            <Title>
            <h1 className='title' onMouseEnter={changeColour} onMouseLeave={changeBack}>Sign Up</h1>
            </Title>
            </header>
            <div className="signForm">
            <form onSubmit={handleSubmit}>
                <div className="userContainer">
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
                    <div className='labelName'>
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
                <div className='error'>
                {Object.values(formErrors).map(err => {
                    return <p>{err}</p>
                })
                }
                </div>
                <div className='btn'>
                <button disabled={disabled} name="submit" href='/sign-in'>
                    Sign Up!
                </button>
                </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}