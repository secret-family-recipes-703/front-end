import React from 'react'
import User from './User'
import styled from 'styled-components'

const UserMap = styled.div`
line-height:2rem;
background:lavenderblush;
`


export default function UserCard(props){
    const {userData} = props

    return(
        <UserMap>
            {
            userData.map((user) => 
                <User user={user} key={user.id}/>
            )}
        </UserMap>
    )
}