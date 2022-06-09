import React from 'react'
import styled from 'styled-components'
import SuggestionCard from './SuggestionCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../axios';
import { useState } from 'react';
import { useEffect } from 'react';

function SuggestionAccount() {
    const { user } = useContext(AuthContext)
    const [suggestion_users, setSuggestionUsers] = useState('')
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 370,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                },
            }
        ]
    };



    const getSuggestionUsers = async () => {
        try {
            const res = await axiosInstance.get(`/user/suggestion/${user._id}/all`)
            setSuggestionUsers(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getSuggestionUsers()
    }, [user._id])
    return (
        <Container>
            <SuggestionSlider {...settings}>
                {suggestion_users &&
                    suggestion_users.map(suggestion =>
                        <SuggestionCard
                            key={Math.random()}
                            suggestion={suggestion}
                            getSuggestionUsers={getSuggestionUsers}
                        />
                    )}
            </SuggestionSlider>
        </Container>
    )
}

export default SuggestionAccount
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
const SuggestionSlider = styled(Slider)`
&:focus{
    outline:none;
};
.slick-prev::before,
.slick-next::before {
  display: none;
}
`