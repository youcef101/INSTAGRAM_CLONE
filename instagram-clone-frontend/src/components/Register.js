import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import axiosInstance from '../axios'
import { useRef } from 'react'
import { useState } from 'react'
import SignUpFormValidation from '../FormValidation/SignUpFormValidation'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Register() {
    const history = useHistory()
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = useState('')
    const [toast, setToast] = useState(false)
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirm: ''
    })


    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_confirmRef = useRef();

    const handlechange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
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

    const SignUp = async () => {
        setErrors(SignUpFormValidation(values));
        let newUser = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirm: password_confirmRef.current.value,
        }
        try {
            if (values.firstName !== '' && values.lastName !== '' && values.email !== '' && values.password !== '' && values.password_confirm !== '') {
                await axiosInstance.post('/auth/register', newUser);
                setValues({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    password_confirm: ''
                })
                history.push('/login')
            }
        } catch (err) {
            console.log(err)
        }

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

            <RegisterContainer>
                <LogoContainer>
                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt='' />
                </LogoContainer>
                <TextContainer>
                    <span>Sign up to see photos and videos from your friends.</span>
                </TextContainer>
                <BtnContainer>
                    <FacebookBtn>
                        <FacebookLogo>
                            <img src="/images/facebook-logo.png" alt='' />
                        </FacebookLogo>
                        <TextBtn>
                            <span>Log in with Facebook</span>
                        </TextBtn>

                    </FacebookBtn>
                    <GoogleBtn>
                        <GoogleLogo>
                            <img src="/images/google-logo.png " alt='' />
                        </GoogleLogo>
                        <TextBtnItem>
                            <span>Log in with Google</span>
                        </TextBtnItem>
                    </GoogleBtn>
                </BtnContainer>
                <Divider>
                    <hr />
                    <span>OR</span>
                    <hr />
                </Divider>
                <InputContainer>

                    <InputCon>
                        <FirstNameInput ref={firstNameRef} name="firstName" value={values.firstName} onChange={handlechange} placeholder="FirstName" type="text" />
                        {errors.firstName && <Errors><span>{errors.firstName}</span></Errors>}
                    </InputCon>
                    <InputCon>
                        <LastNameInput ref={lastNameRef} name="lastName" value={values.lastName} onChange={handlechange} placeholder="LastName" type="text" />
                        {errors.lastName && <Errors><span>{errors.lastName}</span></Errors>}
                    </InputCon>
                    <InputCon>
                        <EmailInput ref={emailRef} name="email" value={values.email} onChange={handlechange} placeholder="Email" type="email" />
                        {errors.email && <Errors><span>{errors.email}</span></Errors>}
                    </InputCon>
                    <InputCon>
                        <PasswordInput ref={passwordRef} name="password" value={values.password} onChange={handlechange} placeholder="Password" type="password" />
                        {errors.password && <Errors><span>{errors.password}</span></Errors>}
                    </InputCon>
                    <InputCon>
                        <PasswordConfirmInput ref={password_confirmRef} name="password_confirm" value={values.password_confirm} onChange={handlechange} placeholder="Password Confirm" type="password" />
                        {errors.password_confirm && <Errors><span>{errors.password_confirm}</span></Errors>}
                    </InputCon>
                    <SignUpBtn onClick={SignUp} >
                        <span>Sign up</span>
                    </SignUpBtn>

                </InputContainer>
                <TxtContainer>
                    <span>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</span>
                </TxtContainer>
                <FooterContainer>
                    <span>Have an account?<Link to="/login">Log in</Link></span>
                </FooterContainer>
            </RegisterContainer>
        </Container>
    )
}

export default Register
const Container = styled.div`
height:100vh;
display:grid;
place-items:center;

`
const RegisterContainer = styled.div`
width:25%;
background-color:white;
border:1px solid #bfbfbf;
margin:10px ;




`
const LogoContainer = styled.div`
margin-top:20px;
display:flex;
align-items:center;
justify-content:center;
img{
    width:50%;
}
`
const TextContainer = styled.div`
margin-top:10px;
display:flex;
align-items:center;
span{
    text-align:center;
    color:#737373;
    font-size:20px;
    font-weight:500;
}
`
const BtnContainer = styled.div`
margin-top:10px;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const FacebookBtn = styled.div`
width:80%;
margin-bottom:7px;
cursor:pointer;
background-color:#004080;
border-radius:4px;
padding:8px 5px;
display:flex;
align-items:center;
justify-content:center;
`
const FacebookLogo = styled.div`
display:flex;
padding-right:5px;
align-items:center;
img{
    width:25px;
    height:25px;
}
`
const TextBtn = styled.div`
span{
    color:white;
    font-weight:500;
}
`
const GoogleBtn = styled(FacebookBtn)`
background:white;
border:1px solid #bfbfbf;
`
const GoogleLogo = styled(FacebookLogo)``
const TextBtnItem = styled(TextBtn)`
span{
    color:#000;
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
    width:50%;
    margin:0 10px;
}
`
const InputContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin-bottom:20px;
`
const FirstNameInput = styled.input`
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
const LastNameInput = styled(FirstNameInput)``
const EmailInput = styled(FirstNameInput)``
const PasswordInput = styled(FirstNameInput)``
const PasswordConfirmInput = styled(FirstNameInput)``
const SignUpBtn = styled.div`
width:80%;
height:40px;
background-color:#004080;
border-radius:4px;
padding:0 10px;
display:flex;
cursor:pointer;
align-items:center;
justify-content:center;
&:hover{
    background-color: #0000b3;
}
span{
    color:white;
    font-weight:500;
}
`
const TxtContainer = styled.div`
margin-bottom:15px;
display:flex;
align-items:center;
justify-content:center;
span{
color:#737373;
font-size:13px;
text-align:center;
}
`
const FooterContainer = styled.div`
margin-bottom:15px;
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
width:80%;
`

