import React from 'react'
import styled from 'styled-components'

const UserBorder = styled.div`
border:4px solid thistle;
background:lavender;
width:30%;
margin:34px auto;
`
const UserName = styled.h1`
color:cornflowerblue;
text-decoration:thistle underline;
font-size:4rem;
`
const UserMail = styled.h3`
color:palevioletred;
font-size:2.5rem;
`

export default function User(props){
    const {user} = props


    return(
        <UserBorder>
            <UserName>
            <h1>{user.first_name} {user.last_name}</h1>
            </UserName>
            <UserMail>
            <h3>{user.email}</h3>
            </UserMail>
        </UserBorder>
    )
}