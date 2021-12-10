import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext } from '../context/AuthContext';


function Follows({ followers, getFollowersNotFollowed }) {

    const { user } = useContext(AuthContext)

    const FollowUser = async (id) => {
        const userId = user._id
        try {
            await axiosInstance.post(`/user/${id}/follow`, { userId })
            getFollowersNotFollowed()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Container>
            {followers &&
                followers.map(follow =>
                    <FollowContainer key={Math.random()} >
                        <Follow>
                            <UserInfoContainer>
                                <NavLink to={`/profile/${follow.fullName}`}>
                                    <UserImg>
                                        <img src={follow.profileImg || '/images/person/noProfile.png'} alt='' />
                                    </UserImg>
                                </NavLink>
                                <UserInfo>
                                    <Username>
                                        <span>{follow.fullName}</span>
                                    </Username>
                                    <Info>
                                        <span>Follows you</span>
                                    </Info>
                                </UserInfo>
                            </UserInfoContainer>

                            <FollowBtn onClick={() => FollowUser(follow._id)} >
                                <span>Follow</span>
                            </FollowBtn>
                        </Follow>
                    </FollowContainer>
                )}
        </Container>
    )
}

export default Follows
const Container = styled.div`
width:25%;
background-color:white;
border:1px solid #bfbfbf;
border-radius:4px;
margin-top:75px;
position:absolute;
top:0;
right:0;
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
const UserInfo = styled.div`

`
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
const Info = styled.div`
margin-top:-8px;
span{
    font-size:12px;
    white-space:nowrap;
}
@media(max-width:1024px){
  span{
    font-size:10px;
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
