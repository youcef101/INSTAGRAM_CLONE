import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
//import axiosInstance from '../axios'
import { useRef } from 'react';
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SignInValidation from '../FormValidation/SignInValidation';
import { apiLogin } from '../apiCalls';
//import { encryptData } from '../Utils';
//import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';


function Login() {
    const { dispatch } = useContext(AuthContext)
    //const history = useHistory()
    const emailRef = useRef();
    const passwordRef = useRef();
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    //const [alert, setAlert] = useState('');
    const [toast, setToast] = useState(false)
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState({})



    const handlechange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleclose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const SignIn = (e) => {
        e.preventDefault()
        setErrors(SignInValidation(values));
        let user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        apiLogin(user, dispatch)
        // const salt = process.env.SALT || '6d090796-ecdf-11ea-adc1-0242ac120003';
        // const encryptedData = encryptData(user, salt);




    }
    return (
        <Container>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleclose}

            >
                <Alert severity={toast === false ? "error" : "success"}>
                    {alert}
                </Alert>
            </Snackbar>
            <LoginContainer>
                <LogoImg>
                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
                </LogoImg>
                <InputContainer>
                    <InputCon>
                        <EmailInput ref={emailRef} name="email" value={values.email} onChange={handlechange} placeholder="Email" type="email" />
                        {errors.email && <Errors><span>{errors.email}</span></Errors>}
                    </InputCon>
                    <InputCon>
                        <PasswordInput ref={passwordRef} name="password" value={values.password} onChange={handlechange} placeholder="Password" type="password" />
                        {errors.password && <Errors><span>{errors.password}</span></Errors>}
                    </InputCon>
                    <SignInBtnContainer onClick={SignIn}>
                        <span>Log in</span>
                    </SignInBtnContainer>
                </InputContainer>
                <Divider>
                    <hr />
                    <span>OR</span>
                    <hr />
                </Divider>
                <SignInBtn >
                    <GoogleLogo>
                        <img src="/images/google-logo.png" alt='' />
                    </GoogleLogo>
                    <TextItem>Sign in with google</TextItem>
                </SignInBtn>
                <FooterContainer>
                    <span>Don't have an account?<Link to="/register">Sign up</Link></span>
                </FooterContainer>

            </LoginContainer>
        </Container>
    )
}

export default Login
const Container = styled.div`
                display:grid;
                place-items:center;
                height:100vh;
               
                `
const LoginContainer = styled.div`
                border:1px solid #bfbfbf;
                background-color:white;
                width:30%;
                height:70vh;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
@media(max-width:1000px){
  width:35%;
}
@media(max-width:900px){
  width:40%;
}
@media(max-width:750px){
  width:45%;
}
@media(max-width:650px){
  width:55%;
}
@media(max-width:550px){
  width:65%;
}
@media(max-width:450px){
  width:75%;
}
@media(max-width:350px){
  width:95%;
}

                `
const LogoImg = styled.div`
margin-bottom:15px;
                cursor:pointer;
                display:flex;
                align-items:center;
                justify-content:center;
                img{
                    width:200px;
                object-fit:cover;
}
                `
const SignInBtn = styled.div`
                margin-top:20px;
                display:flex;
                align-items:center;
                justify-content:center;
                background-color:white;
                border:1px solid #bfbfbf;
                border-radius:4px;
                width:90%;
                height:40px;
                cursor:pointer;
     
}
                `
const GoogleLogo = styled.div`
                display:flex;
                align-items:center;
                padding-right:10px;
                img{
                    border-radius:50%;
                    width:15px;
                    height:15px;
}
                `
const TextItem = styled.div`
                font-weight:500;
                `
const InputContainer = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

`
const EmailInput = styled.input`
display:flex;
align-items:center;
justify-content:center;
padding:0 10px;
margin-bottom:10px;
width:100%;
height:40px;
outline:none;
background-color:#f2f2f2;
border-radius:4px;
border:1px solid #d9d9d9;
:focus{
   border:1px solid #666666;
}
`
const SignInBtnContainer = styled.div`
width:90%;
height:40px;
background-color:#004080;
border-radius:4px;
padding:0 10px;
display:flex;
cursor:pointer;
align-items:center;
justify-content:center;
span{
    color:white;
    font-weight:500;
}
 &:hover{
    background-color: #0000b3;
`
const PasswordInput = styled(EmailInput)``
const FooterContainer = styled.div`
margin:15px 0;
display:flex;
align-items:center;
justify-content:center;
span{

    a{
        text-decoration:none;
        //font-weight:500;
        padding:0 5px;
    }

}
`
const Divider = styled.div`
margin:10px 0;
display :flex;
align-items:center;
span{
    padding:0 10px;
    color:#737373;
}
hr{
    width:100px;
    margin:0 10px;
}
`
const Errors = styled.div`
display:flex;
align-items:start;
justify-content:start;
margin-top:-5px;
margin-bottom:5px;
padding-left:15px;
span{
color:red;
font-size:11px;
text-align:start;
}
`
const InputCon = styled.div`
width:90%;
`
