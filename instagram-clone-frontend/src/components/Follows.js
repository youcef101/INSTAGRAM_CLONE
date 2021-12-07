import React, { useState } from 'react'
import { useEffect } from 'react'
//import { useSelector } from 'react-redux'
import styled from 'styled-components'
import axiosInstance from '../axios'


function Follows() {
    const [followers, setFollowers] = useState([]);

    /*  const FollowUser = async (id) => {
         await axiosInstance.post(`/user/${id}/follow`, { userId })
             .then(res => {
 
 
                 //refresh after follows user
                 axiosInstance.get(`/user/${userId}/followers`)
                     .then(res => {
                         console.log(res)
                         setFollowers(res.data)
                     })
 
             })
     }
 
     useEffect(() => {
         axiosInstance.get(`/user/${userId}/followers`)
             .then(res => {
 
                 setFollowers(res.data)
             })
     }, []) */

    return (
        <Container>


            <FollowContainer >

                <Follow>
                    <UserInfoContainer>
                        <UserImg>
                            <img src="/images/my-image.jpg" />
                        </UserImg>
                        <UserInfo>
                            <Username>
                                <span>ali ahmed</span>
                            </Username>
                            <Info>
                                <span>Follows you</span>
                            </Info>
                        </UserInfo>
                    </UserInfoContainer>

                    <FollowBtn >
                        <span>Follow</span>
                    </FollowBtn>
                </Follow>

                <Follow>
                    <UserInfoContainer>
                        <UserImg>
                            <img src="/images/my-image.jpg" />
                        </UserImg>
                        <UserInfo>
                            <Username>
                                <span>alison paul</span>
                            </Username>
                            <Info>
                                <span>Follows you</span>
                            </Info>
                        </UserInfo>
                    </UserInfoContainer>

                    <FollowBtn >
                        <span>Follow</span>
                    </FollowBtn>
                </Follow>

            </FollowContainer>


        </Container>
    )
}

export default Follows
const Container = styled.div`
width:20%;
background-color:white;
border:1px solid #bfbfbf;
border-radius:4px;
margin-top:75px;
position:absolute;
top:0;
right:0;
margin-top:-1px;
margin-right:40px;
`
const Follow = styled.div`
display:flex;
align-items:center;

`
const FollowContainer = styled.div`
display:flex;
align-items:start;
flex-direction:column;

`
const UserInfoContainer = styled.div`
display:flex;
align-items:center;
flex:1;
`
const UserImg = styled.div`
padding:5px 10px;
display:flex;
align-items:center;
img{
    border-radius:50%;
    width:45px;
    height:45px;
    border:3px solid #e6005c;
}
`
const UserInfo = styled.div``
const Username = styled.div`
span{
    font-weight:500;
}
`
const Info = styled.div`
margin-top:-8px;
span{
    font-size:12px;
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
`
