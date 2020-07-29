import Styled from 'styled-components'

 const ParentDiv = Styled.div`
*{
    box-sizing: border-box
}
display: flex;
justify-content: center;
width: 100%;
height: 100vh;
form{
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 65%;
    margin: 3rem 0;
    border: 3px solid #E81B23;
    border-radius: 20px;
    background-color: #4AC6D7;
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    min-height: 550px;
    max-height: 700px;
    h2 {
        color: #FF91BB;
        font-family: 'porter-sans-inline-block';
        font-style: normal;
        font-weight: normal;
        font-size: 2.5rem;
        text-align: center;
        margin: 3rem 2rem 2rem
    }
    label{
        width: 100%;
        text-align: center;
    }
    input, select{
        background: #EEEEEE;
        border: 2px solid #F5855B;
        box-sizing: border-box;
        box-shadow: 4px 4px 0px #F5855B;
        border-radius: 15px;
        width: 65%;
        height: 40px;
        text-align: center;
        margin: 2% 0;
        font-family: Poppins;
        font-size: 1.1rem;
    }
    select{
        text-align-last:center;
    }
    button{
        background: #68BBB8;
        border: 2px solid #FF91BB;
        box-sizing: border-box;
        box-shadow: 4px 4px 0px #FF91BB;
        border-radius: 15px;
        width: 65%;
        height: 40px;
        color: white;
        margin: 2% 0;

        font-family: Poppins;
        text-transform: uppercase;
        font-size: 1.25rem;
        text-align: center;
    }
    #appendBtn{
        background-color: #FF91BB;
        box-shadow: 4px 4px 0px  #FFD95C;
        border: 2px solid #FFD95C;
    }
}
`

export default ParentDiv