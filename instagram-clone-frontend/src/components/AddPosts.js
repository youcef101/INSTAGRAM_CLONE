import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { useRef } from 'react';
import axiosInstance from '../axios';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../Firebase';


function AddPosts({ getTimlinePosts }) {
    const PF = 'https://instagram-clone-deploy.herokuapp.com/public/uploads/'
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        title: '',
        desc: '',
        postImg: '',

    })

    const toggleOpen = () => {
        setOpen(true)
    }
    const toggleClose = () => {
        setOpen(false)
    }
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        }
        )
    }

    const handlePhoto = (e) => {
        setValues({ ...values, postImg: e.target.files[0] });
    }

    const addPost = async (e) => {
        e.preventDefault();
        if (values?.postImg) {
            const fileName = new Date().getTime() + values.postImg.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, values.postImg);
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
                        const newPost = {
                            userId: user._id,
                            title: values.title,
                            desc: values.desc,
                            postImg: downloadURL
                        }
                        try {
                            axiosInstance.post('/post/add', newPost);
                            setOpen(false)
                            getTimlinePosts()
                        } catch (err) {
                            console.log(err)
                        }
                    });
                }
            );
        } else {
            const newPost = {
                userId: user._id,
                title: values.title,
                desc: values.desc,

            }
            try {
                await axiosInstance.post('/post/add', newPost);
                setOpen(false)
                getTimlinePosts()
            } catch (err) {
                console.log(err)
            }

        }

    }
    //console.log(user)
    return (
        <Container>
            <AddPostContainer>
                <PostContainer>
                    <NavLink to={`/profile/${user.fullName}`}>
                        <UserImg>
                            <img src={user?.profileImg || '/images/person/noProfile.png'} alt='' />
                        </UserImg>
                    </NavLink>
                    <AddPost onClick={toggleOpen}>
                        {open === true ?
                            <ModalContainer isOpen={toggleClose} >
                                <ModalPostHeader>
                                    Add new post
                                </ModalPostHeader>
                                <form encType="multipart/form-data">
                                    <ModalPostBody>

                                        <InputContainer >

                                            <TitleInput name="title" value={values.title} onChange={handleChange} type="text" placeholder="Enter your post title ..." />
                                            <DescInput name="desc" value={values.desc} onChange={handleChange} placeholder="Enter your post description ..." />
                                            <SelectBtn >
                                                <input onChange={handlePhoto} name='file' type="file" />
                                            </SelectBtn>

                                        </InputContainer>

                                    </ModalPostBody>
                                    <ModalPostFooter>
                                        <CloseBtn onClick={toggleClose}>Close</CloseBtn>
                                        <SubmitBtn onClick={addPost} >Add Post</SubmitBtn>
                                    </ModalPostFooter>
                                </form>
                            </ModalContainer>
                            : null}
                        <span>Add new Post ...</span>
                    </AddPost>

                </PostContainer>
            </AddPostContainer>



        </Container>
    )
}

export default AddPosts
const Container = styled.div`
width:40%;
background-color:white;
border:1px solid #bfbfbf;
border-radius:4px;
margin-bottom:2px;
@media(max-width:1024px){
   width:50%;
}
@media(max-width:965px){
   width:70%;
}
@media(max-width:823px){
   width:100%;
}
`
const AddPostContainer = styled.div``
const PostContainer = styled.div`
padding:10px 10px;
display:flex;
align-items:center;
`
const UserImg = styled.div`
display:flex;
align-items:center;
img{
    border-radius:50%;
    width:50px;
    height:50px;
    border:1px solid #e6005c;
}
`
const AddPost = styled.div`
margin-left:10px;
cursor:pointer;
flex:1;
border:1px solid #bfbfbf;
border-radius:50px;
background-color:#e6e6e6;
padding:15px 10px;
&:hover{
    background-color: #f2f2f2;
}

`
const ModalContainer = styled(Modal)`
display:grid;
place-items:center;
`
const ModalPostHeader = styled(ModalHeader)``
const ModalPostBody = styled(ModalBody)``
const ModalPostFooter = styled(ModalFooter)``
const CloseBtn = styled.div`
border-radius:4px;
border:2px solid #000;
padding:5px 5px;
cursor:pointer;
`
const SubmitBtn = styled.div`
border-radius:4px;
border:2px solid #000;
padding:5px 5px;
cursor:pointer;

`
const InputContainer = styled.div`
display:flex;
align-items:flex-start;
flex-direction:column;
`
const TitleInput = styled.input`
padding:5px 5px;
border-radius:4px;
outline:none;
width:100%;
margin-bottom:10px;
`
const DescInput = styled.textarea`
padding:5px 5px;
border-radius:4px;
outline:none;
width:100%;
`
const SelectBtn = styled.button`
margin-top:10px;
background-color:white;
border:none;
border-radius:4px;

label{
cursor:pointer;
 font-size:16px;
 text-transform:uppercase;
}
 `



