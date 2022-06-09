import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext } from '../context/AuthContext'

function SuggestionCard({ suggestion, getSuggestionUsers }) {
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
            <Wrap>
                <NavLink to={`/profile/${suggestion?.fullName}`}>
                    <img src={suggestion?.profileImg || '/images/person/noProfile.png'} alt='' />
                </NavLink>
            </Wrap>
            <Item>
                <span>{suggestion?.fullName}</span>
            </Item>
            <FollowBtn onClick={() => FollowUser(suggestion?._id)}>
                <span>Follow</span>
            </FollowBtn>
        </Container>
    )
}

export default SuggestionCard
const Container = styled.div`
width:95%;
border:1px solid gray;
margin:5px 5px;
padding:5px 0px;
border-radius:5px;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const Wrap = styled.div`
img{
    width:60px;
    height:60px;
    border-radius:50%;
    cursor:pointer;
}
`
const Item = styled.div`
margin-top:7px;
width:90%;
height:55px;
text-align:center;
span{
font-size:14px;
}
`
const FollowBtn = styled.div`
margin-top:7px;
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
}
`

