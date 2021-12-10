import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Slider from "react-slick";
import axiosInstance from '../axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function FreindStory() {
    const [followings, setFollowings] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const getFollowings = async () => {
            try {
                const res = await axiosInstance.get(`/user/${user._id}/followings`);
                setFollowings(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        getFollowings()
    }, [user._id])


    return (
        <Container>
            <UserStoryContainer>
                {followings &&
                    followings.map(following =>
                        <UserContainer key={Math.random()} >
                            <NavLink to={`/profile/${following?.fullName}`}>
                                <UserImg>
                                    <img src={following?.profileImg || '/images/person/noProfile.png'} alt="" />
                                </UserImg>
                            </NavLink>
                            <UserName>
                                <span>{following?.fullName}</span>
                            </UserName>
                        </UserContainer>
                    )}



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

`
const UserStoryContainer = styled.div`
width:100%;
display:flex;
align-items:flex-start;
margin:10px 0;
`
const UserContainer = styled.div`
width:15%;
margin:0 5px;
display:flex;
align-items:center;
flex-direction:column;
cursor:pointer;
`
const UserName = styled.div`
span{
    font-size:10px;
    white-space:nowrap;
}


`
const UserImg = styled.div`
//margin:0 5px;
img{
    border-radius:50%;
    width:70px;
    height:70px;
    border:1px solid #e6005c;
}
// @media(max-width:1000px){
//    img{
//     border-radius:50%;
//     width:40px;
//     height:40px;
//     border:1px solid #e6005c;
// }

}
`
