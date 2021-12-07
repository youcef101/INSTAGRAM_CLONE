import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import axiosInstance from '../axios';
import Comment from './Comment'



function Posts() {


    const [userInfo, setUserInfo] = useState([])
    const [content, setContent] = useState('')
    const [comment, setComment] = useState([])
    const contentRef = useRef();

    /*  const getPostComment = () => {
         axiosInstance.get(`/comment/${postId}/all`)
             .then(res => {
                 setComment(res.data)
             })
     }
 
     useEffect(() => {
         axiosInstance.get(`/user/${post_userId}`)
             .then(res => {
 
                 setUserInfo(res.data)
             })
 
     }, [])
     useEffect(() => {
         getPostComment();
     }, [postId]) */
    const handlechange = (e) => {
        setContent(e.target.value);
    }
    /* const add_comment = () => {
        let newComment = {
            userId: userId,
            postId: postId,
            content: contentRef.current.value
        }
        axiosInstance.post('/comment/add', newComment)
            .then(res => {

                getPostComment();
                setContent('')

            })
    } */

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Container>
            <PostContainer>
                <PostHeader>

                    <UserInfos>
                        <UserImg>
                            <img src="/images/my-image.jpg" alt="" />
                        </UserImg>
                        <UserInf>
                            <UserName>youcef ben khadem</UserName>
                            <SubName>hello my freinds</SubName>
                        </UserInf>
                    </UserInfos>

                    <SettingContainer>
                        <MoreHorizOutlinedIcon />
                    </SettingContainer>
                </PostHeader>
                <PostBody>
                    <Carousel {...settings}>
                        <Wrap>
                            <img src="/images/my-image.jpg" alt="" />
                        </Wrap>

                    </Carousel>
                    <ActionContainer>
                        <Action>
                            <ActionIc>
                                <FavoriteBorderRoundedIcon />
                            </ActionIc>
                            <ActionIc>
                                <ChatBubbleOutlineOutlinedIcon />
                            </ActionIc>
                            <ActionIc>
                                <NearMeOutlinedIcon />
                            </ActionIc>
                        </Action>
                        <SaveIc>
                            <BookmarkBorderOutlinedIcon />
                        </SaveIc>
                    </ActionContainer>
                </PostBody>

                <Comment />


                <hr />
                <AddCommentContainer>
                    <AddComment>
                        <EmoIc>
                            <SentimentSatisfiedIcon />
                        </EmoIc>
                        <CommentInput ref={contentRef} onChange={handlechange} value={content} placeholder="Add comment..." />

                    </AddComment>
                    <PublierBtn><a href="#">Publier</a></PublierBtn>
                </AddCommentContainer>
            </PostContainer>
        </Container>
    )
}

export default Posts
const Container = styled.div`
margin-bottom:40px;
width:40%;
background-color:white;
border:1px solid #bfbfbf;
border-radius:4px;
`
const PostContainer = styled.div``
const PostHeader = styled.div`
display:flex;
align-items:center;

`
const UserInfos = styled.div`
flex:1;
display:flex;
align-items:center;
padding:5px 10px;
`
const UserImg = styled.div`
cursor:pointer;
display:flex;
align-items:center;
margin-right:6px;
img{
    border-radius:50%;
    width:40px;
    height:40px;
    border:3px solid #e6005c;
}
`
const UserInf = styled.div`
display:flex;
//align-items:center;
flex-direction:column;
`
const UserName = styled.div`
font-weight:500;
cursor:pointer;
&:hover{
    text-decoration:underline;
}
`
const SubName = styled.div`
font-size:12px;
`
const SettingContainer = styled.div`
padding:0 5px;
cursor:pointer;
`
const PostBody = styled.div`
padding-bottom:10px;
`
const Carousel = styled(Slider)`
ul li button{
    
    &:before{
        font-size:10px;
        color:rgb(150,158,171);
    }
}
li.slick-active button:before{
    color: #4d4dff;
    
}
button{
    z-index:1;
   background: #999999;
   border-radius:50%;
    
}

`
const Wrap = styled.div`
img{
    object-fit:cover;
    width:100%;
    
}
`
const ActionContainer = styled.div`
display:flex;
align-items:center;
padding:2px 15px;
`
const Action = styled.div`
display:flex;
align-items:center;
flex:1;
`
const ActionIc = styled.div`
//cursor:pointer;
margin-right:20px;
.MuiSvgIcon-root{
    font-size:30px;
    color:#262626;
}
`
const SaveIc = styled.div`
//cursor:pointer;
.MuiSvgIcon-root{
    font-size:30px;
    color:#262626;
}
`

const AddCommentContainer = styled.div`
display:flex;
align-items:center;
`
const AddComment = styled.div`
display:flex;
align-items:center;
padding:15px 10px;
flex:1;
`
const EmoIc = styled.div`
display:flex;
margin-top:-15px;
align-items:center;
padding-right:10px;
.MuiSvgIcon-root{
    font-size:30px;
    color:#262626;
}
`
const CommentInput = styled.textarea`
display:flex;
align-items:center;
 border: none;
background-color: transparent;
resize: none;
    outline: none;
width:80%;
overflow:auto;
`
const PublierBtn = styled.div`
padding-right:15px;
a{
    text-decoration:none;
    font-weight:500;
}
`

