import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext } from '../context/AuthContext'
import PublishIcon from '@material-ui/icons/Publish';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../Firebase';

function EditUser() {
    const [edited, setIsEdited] = useState(false)
    const { user } = useContext(AuthContext)
    const [file, setFile] = useState('')
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


    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handlePhoto = (e) => {
        setFile(e.target.files[0])
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
    }, [user._id, edited])


    //edit user info
    const EditInfo = async (e) => {
        setIsEdited(true)
        e.preventDefault();
        if (file) {
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                    }
                },
                (error) => { },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const edited_user = {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            fullName: values.fullName,
                            email: values.email,
                            country: values.country,
                            city: values.city,
                            phone: values.phone,
                            profileImg: downloadURL
                        }
                        try {

                            axiosInstance.put(`/user/${user._id}/info/edit`, edited_user)
                                && getCurrentUser()

                        } catch (err) {
                            console.log(err)
                        }
                    });
                }
            );
        } else {
            const edited_user = {
                firstName: values.firstName,
                lastName: values.lastName,
                fullName: values.fullName,
                email: values.email,
                country: values.country,
                city: values.city,
                phone: values.phone,

            }
            try {

                axiosInstance.put(`/user/${user._id}/info/edit`, edited_user)
                    && getCurrentUser()

            } catch (err) {
                console.log(err)
            }

        }
    }






    return (
        <Container>
            <UserInfosContainer>
                <ImgContainer>
                    <Wrap style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={user?.profileImg || 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'} alt='' />
                    </Wrap>
                    <UploadContainer style={{ display: 'flex', justifyContent: 'center' }}>
                        <LabelContainer htmlFor='file' style={{
                            cursor: 'pointer',
                            width: '100%', height: '30px', backgroundColor: 'teal', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '5px'
                        }}>
                            <PublishIcon fontSize='small' />Upload</LabelContainer>
                        <input type='file' id='file' style={{ display: 'none' }} onChange={handlePhoto} />
                    </UploadContainer>

                </ImgContainer>
                <UserImgContainer>
                    <InfosContainer>
                        <FirstNameInput name="firstName" type='text' defaultValue={user?.firstName} onChange={handleChange} placeholder="Enter your firstName ..." />
                        <LastNameInput name="lastName" type='text' defaultValue={user?.lastName} onChange={handleChange} placeholder="Enter your lastName ..." />
                        <FullNameInput name="fullName" type='text' defaultValue={user?.fullName} onChange={handleChange} placeholder="Enter your fullName ..." />
                        <EmailInput name="email" type='text' defaultValue={user?.email} onChange={handleChange} placeholder="Enter your email ..." />
                        <CountryInput name="country" type='text' defaultValue={user?.country} onChange={handleChange} placeholder="Enter your country ..." />
                        <CityInput name="city" type='text' defaultValue={user?.city} onChange={handleChange} placeholder="Enter your city ..." />
                        <PhoneInput name="phone" type='text' defaultValue={user?.phone} onChange={handleChange} placeholder="Enter your phone ..." />
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
    width:98% !important;
    height:98% !important;
    border-radius:50% !important;
   
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
};
@media(max-width:540px){
width:40%;
}
@media(max-width:400px){
width:50%;
}
@media(max-width:350px){
width:65%;

}
`
const UploadContainer = styled.div``
const LabelContainer = styled.label`
color:gray;
margin:5px 0px;
`
