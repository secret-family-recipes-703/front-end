import React from 'react'
import {NavLink} from 'react-router-dom'
import Styled from 'styled-components'

const NavBarStyle = Styled.div`
display: flex;
justify-content: center;
background-color: #4AC6D7;
width: 100%;
height: 80px;
nav {display: flex;
    align-items: center;
    justify-content: flex-end;
    /* background-color: grey; */
    width: 50%;
}
div{
    display: flex;
    justify-content: space-between;
    /* background-color: red; */
    max-width: 1100px;
    width: 80%;
        h2{
            display:flex;
            align-items: center;
            font-family: Poppins;
        }
}
button{
        background-color: #68BBB8;
        border: 2px solid #FF91BB;
        box-sizing: border-box;
        box-shadow: 4px 4px 0px #FF91BB;
        border-radius: 15px;
        /* height: 40px; */
        padding: .5rem 1rem;
        color: white;
        font-family: Poppins;
        text-transform: uppercase;
        font-size: 1rem;
        text-align: center;
    }
    button:focus{
        outline: none;
    }
    button:hover{
        transform: scale(1.1);
    }
    .notLast{
        margin-right: 1rem;
    }
`


const NavBar = props => {

    return(
        <NavBarStyle>
            <div>
            <NavLink style={{textDecoration: 'none'}} to='/recipes'><h2>Secret Family Recipes</h2></NavLink>
            { 
            <nav>
                <NavLink to='/recipes'>
                <button class='notLast'>Recipes</button>
                </NavLink>
                <NavLink to='/create'>
                <button>Add recipe</button>
                </NavLink>
            </nav>
            }       
            </div>
        </NavBarStyle>
    )
}

export default NavBar