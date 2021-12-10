import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { useRef } from 'react';
import axiosInstance from '../axios';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';


function AddPosts({ getTimlinePosts }) {
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
        console.log(e.target.files[0])
        setValues({ ...values, postImg: e.target.files[0] });
    }

    const addPost = async () => {

        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('title', values.title);
        formData.append('desc', values.desc);
        formData.append('file', values.postImg);
        try {
            await axiosInstance.post('/post/add', formData);
            setOpen(false)
            getTimlinePosts()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container>
            <AddPostContainer>
                <PostContainer>
                    <NavLink to={`/profile/${user.fullName}`}>
                        <UserImg>
                            <img src={user.profileImg || '/images/person/noProfile.png'} alt='' />
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
margin-bottom:20px;
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



