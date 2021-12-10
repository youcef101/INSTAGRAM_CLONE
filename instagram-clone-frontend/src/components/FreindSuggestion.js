import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import axiosInstance from '../axios';
//import axiosInstance from '../axios'
import { AuthContext } from '../context/AuthContext';

function FreindSuggestion({ suggestion_users, getSuggestionUsers }) {
    const { user } = useContext(AuthContext)
    const FollowUser = async (id) => {
        const userId = user._id
        try {
            await axiosInstance.post(`/user/${id}/follow`, { userId })
            getSuggestionUsers()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>

            <FollowContainer >
                {suggestion_users &&
                    suggestion_users.map(suggestion =>
                        <Follow key={Math.random()}>
                            <UserInfoContainer>
                                <NavLink to={`/profile/${suggestion.fullName}`}>
                                    <UserImg>
                                        <img src={suggestion.profileImg || '/images/person/noProfile.png'} alt='' />
                                    </UserImg>
                                </NavLink>
                                <UserInfo>
                                    <Username>
                                        <span>{suggestion.fullName}</span>
                                    </Username>

                                </UserInfo>
                            </UserInfoContainer>

                            <FollowBtn onClick={() => FollowUser(suggestion._id)}  >
                                <span>Follow</span>
                            </FollowBtn>
                        </Follow>
                    )}
            </FollowContainer>

        </Container>
    )
}

export default FreindSuggestion

const Container = styled.div`
width:25%;
background-color:white;
border:1px solid #bfbfbf;
border-radius:4px;
margin-top:75px;
position:absolute;
top:0;
left:0;
margin-top:-1px;
margin-right:40px;
@media(max-width:1024px){
   width:20%;
}
@media(max-width:965px){
   display:none;
}
`
const Follow = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:space-between;

`
const FollowContainer = styled.div`
width:100%;
display:flex;
align-items:start;
flex-direction:column;

`
const UserInfoContainer = styled.div`
width:60%;
display:flex;
align-items:center;

`
const UserImg = styled.div`
padding:5px 10px;
display:flex;
align-items:center;
img{
    border-radius:50%;
    width:45px;
    height:45px;
    border:1px solid #e6005c;
}
@media(max-width:1024px){
 img{
    width:38px;
    height:38px;
}
}
`
const UserInfo = styled.div``
const Username = styled.div`
min-width:20%;
span{
    font-weight:500;
}
@media(max-width:1024px){
  span{
    font-weight:200;
    font-size:11px;
}
}
`

const FollowBtn = styled.div`
margin-right:10px;
background-color:#4d4dff;
width:20%;
border-radius:4px;
padding:3px 30px;
cursor:pointer;
span{
    display:flex;
    justify-content:center;
    color:white;
    font-weight:500;
}
&:hover{
    background-color: #0000ff;
}
@media(max-width:1024px){
  width:15%;
  span{
    font-weight:200;
    font-size:11px;
}
}
`

