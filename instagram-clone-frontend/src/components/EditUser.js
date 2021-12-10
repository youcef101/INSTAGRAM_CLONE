import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext } from '../context/AuthContext'
//import { useParams } from 'react-router-dom';
function EditUser() {

    //const { userId } = useParams()
    const { user } = useContext(AuthContext)

    const [values, setValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: user.fullName,
        country: user.country,
        city: user.city,
        phone: user.phone,
        profileImg: user.profileImg
    })
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const fullNameRef = useRef()
    const emailRef = useRef()
    const countryRef = useRef()
    const cityRef = useRef()
    const phoneRef = useRef()
    const profileImgRef = useRef()

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handlePhoto = (e) => {
        console.log(e.target.files[0])
        setValues({ ...values, profileImg: e.target.files[0] });
    }


    const getCurrentUser = async () => {
        try {
            const res = await axiosInstance.get(`/user/${user._id}`)
            localStorage.setItem('user_login', JSON.stringify(res.data))

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCurrentUser()
    }, [user._id])

    //edit user info
    const EditInfo = async () => {

        let edited_user = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            fullName: fullNameRef.current.value,
            email: emailRef.current.value,
            country: countryRef.current.value,
            city: cityRef.current.value,
            phone: phoneRef.current.value,
        }

        try {

            await axiosInstance.put(`/user/${user._id}/info/edit`, edited_user)
            getCurrentUser()

        } catch (err) {
            console.log(err)
        }
    }

    //edit user photo
    const EditPhoto = async () => {
        const formData = new FormData();
        formData.append('file', values.profileImg);

        try {
            await axiosInstance.put(`/user/${user._id}/photo/edit`, formData)
            getCurrentUser()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <UserInfosContainer>
                <ImgContainer>
                    <Wrap>
                        <img src={user.profileImg || '/images/person/noProfile.png'} alt='' />
                    </Wrap>
                    <form encType="multipart/form-data">
                        <SelectBtn >
                            <EditPhotoInput ref={profileImgRef} onChange={handlePhoto} name='file' type="file" />
                        </SelectBtn>
                    </form>
                    <ModifyPhoto onClick={EditPhoto}>
                        Changer Photo
                    </ModifyPhoto>
                </ImgContainer>
                <UserImgContainer>
                    <InfosContainer>
                        <FirstNameInput ref={firstNameRef} name="firstName" type='text' value={values.firstName} onChange={handleChange} placeholder="Enter your firstName ..." />
                        <LastNameInput ref={lastNameRef} name="lastName" type='text' value={values.lastName} onChange={handleChange} placeholder="Enter your lastName ..." />
                        <FullNameInput ref={fullNameRef} name="fullName" type='text' value={values.fullName} onChange={handleChange} placeholder="Enter your fullName ..." />
                        <EmailInput ref={emailRef} name="email" type='text' value={values.email} onChange={handleChange} placeholder="Enter your email ..." />
                        <CountryInput ref={countryRef} name="country" type='text' value={values.country} onChange={handleChange} placeholder="Enter your country ..." />
                        <CityInput ref={cityRef} name="city" type='text' value={values.city} onChange={handleChange} placeholder="Enter your city ..." />
                        <PhoneInput ref={phoneRef} name="phone" type='text' value={values.phone} onChange={handleChange} placeholder="Enter your phone ..." />
                        <EditBtn onClick={EditInfo}>Edit</EditBtn>

                    </InfosContainer>

                </UserImgContainer>

            </UserInfosContainer>

        </Container>
    )
}

export default EditUser
const Container = styled.div`
overflow-x:hidden;`
const UserInfosContainer = styled.div`
width:100vw;
//height:100vh;
display:flex;
align-items:center;
justify-content:space-evenly;
overflow-x:hidden;
@media(max-width:775px){
flex-direction:column;
}
`
const UserImgContainer = styled.div`
margin-top:30px;
//height:90vh;
width:60%;
background-color:white;
border-radius:4px;
@media(max-width:775px){
width:80%;
}
@media(max-width:350px){
width:100%;

}
`
const ImgContainer = styled.div`
width:20%;
//height:400px;
background-color:white;
display:flex;
flex-direction:column;
//margin-right:50px;
margin-top:30px;
@media(max-width:775px){
width:40%;
margin-top:40px
}
@media(max-width:540px){
width:55%;
}
@media(max-width:400px){
width:65%;
}
@media(max-width:350px){
width:100%;

}
`
const Wrap = styled.div`
cursor:pointer;
img{
    margin-top:10px;
    //border:1px solid #000;
    width:98%;
    height:98%;
    border-radius:50%
   
}
`
const InfosContainer = styled.div`
margin-left:5px;
width:97%;
height:100%;
margin-top:35px;
`
const FirstNameInput = styled.input`
width:100%;
height:55px;
margin-bottom:10px;
border:none;
background-color:#f2f2f2;
:focus{
    outline:none;
}
`
const LastNameInput = styled(FirstNameInput)``
const FullNameInput = styled(FirstNameInput)``
const EmailInput = styled(FirstNameInput)``
const CountryInput = styled(FirstNameInput)``
const CityInput = styled(FirstNameInput)``
const PhoneInput = styled(FirstNameInput)``
const EditBtn = styled.div`
width:20%;
height:50px;
cursor:pointer;
border:2px solid #808080;
background-color:#cccccc;
border-radius:4px;
font-size:14px;
font-weight:700;
display:flex;
justify-content:center;
align-items:center;
color: #262626;
:hover{
    background-color:#e6e6e6;
}
`
const SelectBtn = styled.div`
margin-top:30px;
width:100%;

`
const EditPhotoInput = styled.input`
width:90%
`
const ModifyPhoto = styled.div`

margin-top:20px;
width:100%;
height:35px;
cursor:pointer;
border:2px solid #808080;
background-color:#cccccc;
border-radius:4px;
font-size:14px;
font-weight:700;
display:flex;
justify-content:center;
align-items:center;
color: #262626;
:hover{
    background-color:#e6e6e6;
}
`
