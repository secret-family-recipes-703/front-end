import React, {useState,useEffect} from 'react'
import axios from 'axios'
import UserCard from './userCard'
import styled from 'styled-components'

const UserContainer = styled.div`
display:flex;
text-align:center;
flex-direction:column;
background:lavenderblush;
`
const UserTitle = styled.h1`
color:palevioletred;
font-size:7rem;
text-decoration:cornflowerblue underline;
`

export default function UserData(){
    const [userData, setUserData] = useState([])
 
    useEffect(() => {
        axios
        .get('https://reqres.in/api/users')
        .then(res => {
            console.log('working!', res.data.data)
            setUserData(res.data.data)
        })
        .catch(err => {
            console.log('There was an error!:',err)
        })
    },[])
    return(
        <UserContainer>
            <UserTitle>
            <h1>Welcome Friends!</h1>
            </UserTitle>
            <UserCard userData={userData}/>
        </UserContainer>
    )
}