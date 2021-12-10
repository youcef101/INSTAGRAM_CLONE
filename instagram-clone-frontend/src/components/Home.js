import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext } from '../context/AuthContext'

import AddPosts from './AddPosts'
import Follows from './Follows'
import FreindStory from './FreindStory'
import FreindSuggestion from './FreindSuggestion'
import Header from './Header'
import Posts from './Posts'

function Home() {
    const { user } = useContext(AuthContext)
    const [timeline_posts, setTimeLinePosts] = useState('')
    const [followers, setFollowers] = useState('');
    const [suggestion_users, setSuggestionUsers] = useState('')
    const getTimlinePosts = async () => {
        try {
            const res = await axiosInstance.get(`/post/${user._id}/timeline/all`)
            setTimeLinePosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getFollowersNotFollowed = async () => {
        try {
            const res = await axiosInstance.get(`/user/${user._id}/followers`)
            setFollowers(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getSuggestionUsers = async () => {
        try {
            const res = await axiosInstance.get(`/user/suggestion/${user._id}/all`)
            setSuggestionUsers(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTimlinePosts()
    }, [user._id])

    useEffect(() => {
        getFollowersNotFollowed()
    }, [user._id])

    useEffect(() => {
        getSuggestionUsers()
    }, [user._id])

    return (
        <Container>
            <Header />
            {suggestion_users ?
                <FreindSuggestion suggestion_users={suggestion_users} getSuggestionUsers={getSuggestionUsers} />
                : null}
            <AddPosts getTimlinePosts={getTimlinePosts} />
            <FreindStory />
            {timeline_posts &&
                timeline_posts.map(post =>
                    <Posts key={Math.random()} post={post} />
                )}
            {followers ?
                <Follows
                    //key={Math.random()}
                    followers={followers}
                    getFollowersNotFollowed={getFollowersNotFollowed}
                />
                : null
            }
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
