import Styled from 'styled-components'

 const ParentDiv = Styled.div`
*{
    box-sizing: border-box
}
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100vh;
form{
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65%;
    margin: 3rem 0;
    border: 3px solid #E81B23;
    border-radius: 20px;
    background-color: rgba(74, 198, 215, 0.7);
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    min-height: 550px;
    max-height: 800px;
    padding: 2rem;
    h2 {
        color: #FF91BB;
        font-family: 'porter-sans-inline-block';
        font-style: normal;
        font-weight: normal;
        font-size: 4rem;
        text-align: center;
        margin: 3rem 2rem 2rem;
    }
    label{
        width: 100%;
        text-align: center;
    }
    input, select{
        background-color: #EEEEEE;
        border: 2px solid #F5855B;
        box-sizing: border-box;
        box-shadow: 4px 4px 0px #F5855B;
        border-radius: 15px;
        width: 65%;
        height: 40px;
        text-align: center;
        margin: 2% 0;
        font-family: Poppins;
        font-size: 2rem;
    }
    input:focus{
        outline: none;
        transform: scale(1.1);
    }
    input:hover{
        transform: scale(1.1);
    }
    select{
        text-align-last:center;
    }
    select:hover{
        transform: scale(1.1);
    }
    select:focus{
        outline: none;
    }
    button{
        background-color: #68BBB8;
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
        font-size: 2rem;
        text-align: center;
    }
    button:focus{
        outline: none;
    }
    button:hover{
        transform: scale(1.1);
    }
    button:disabled, #appendBtn:disabled{
        background-color: grey;
        border: none;
        box-shadow: none;
    }
    #appendBtn{
        background-color: #FF91BB;
        box-shadow: 4px 4px 0px  #FFD95C;
        border: 2px solid #FFD95C;
    }
    #notePad{
        margin-bottom: 1rem;
        transform: rotate(1deg);
        width: 60%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(34, 30, 30, 0.2) 85.42%), #FFD95C;
        height: 300px;
        box-shadow: 4px 4px 8px;
        padding: 1rem 2rem 2rem;
        overflow: scroll;
        overflow-x: hidden;
        font-size: 2.6rem;
    }
    #notePad p {
        margin: 0;
        font-family: 'Merienda-Regular'
    }
}
        #videoBG {
            position: absolute;
            z-index: -1;
            min-height: 50%;
            max-height:100%;
            min-width: 100%;
            bottom: 0;
            right: 0;
            padding: none;
            overflow-x: hidden;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .errors{
            font-size:3rem;
            font-style: italic;
            font-style: bold;
            color:red;            
        }
`

export default ParentDiv