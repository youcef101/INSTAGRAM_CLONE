import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axiosInstance from '../axios';
import { NavLink, useParams } from 'react-router-dom';

function FreindStory() {
    const [followings, setFollowings] = useState([])


    /*  useEffect(() => {
         axiosInstance.get(`/user/${userId}/followings`)
             .then(res => {
                 console.log(res.data)
                 setFollowings(res.data)
             })
     }, []) */
    return (
        <Container>
            <UserStoryContainer>

                <UserContainer >
                    <NavLink to="#">
                        <UserImg>
                            <img src="/images/my-image.jpg" alt="" />
                        </UserImg>
                    </NavLink>
                    <UserName>
                        <span>youvcef ben khadem</span>
                    </UserName>
                </UserContainer>
                <UserContainer >
                    <NavLink to="#">
                        <UserImg>
                            <img src="/images/my-image.jpg" alt="" />
                        </UserImg>
                    </NavLink>
                    <UserName>
                        <span>alia ben othmen</span>
                    </UserName>
                </UserContainer>
                <UserContainer >
                    <NavLink to="#">
                        <UserImg>
                            <img src="/images/my-image.jpg" alt="" />
                        </UserImg>
                    </NavLink>
                    <UserName>
                        <span>sahar ben ali</span>
                    </UserName>
                </UserContainer>


            </UserStoryContainer>
        </Container>
    )
}

export default FreindStory
const Container = styled.div`
width:40%;
background-color:white;
border:1px solid #bfbfbf;
border-radius:4px;
margin-bottom:20px;
@media(max-width:1300px){
    width:8%;
}
`
const UserStoryContainer = styled.div`
display:flex;
align-items:flex-start;
margin:10px 0;
@media(max-width:1300px){
    display:flex;
    flex-direction:column;
}

`
const UserContainer = styled.div`
display:flex;
align-items:center;
flex-direction:column;
cursor:pointer;
`
const UserName = styled.div`
span{
    font-size:12px;
    white-space:nowrap;
    
}
`
const UserImg = styled.div`
margin:0 10px;
img{
    border-radius:50%;
    width:70px;
    height:70px;
    border:3px solid #e6005c;
}
`
