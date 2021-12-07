import React, { useState } from 'react'
import { useEffect } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axiosInstance from '../axios'

import AddPosts from './AddPosts'
import Follows from './Follows'
import FreindStory from './FreindStory'
import Posts from './Posts'

function Home() {

    // useEffect(() => {
    //     axiosInstance.get(`/post/${userId}/timeline/all`)
    //         .then(res => {
    //             let posts = res.data;

    //         })

    // }, [])



    return (
        <Container>
            <AddPosts />
            <FreindStory />
            <Posts />
            <Follows />
        </Container>
    )
}

export default Home
const Container = styled.div`
position:relative;
margin-top:75px;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
