import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'

function Comment({ comment }) {
    const [userInfo, setUserInfo] = useState('')
    //console.log(userInfo)
    useEffect(() => {
        const getCommentsUserInfo = async () => {
            try {
                const res = await axiosInstance.get(`/user/${comment.userId}`)
                setUserInfo(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getCommentsUserInfo()
    }, [comment.userId])

    return (
        <Container>
            <CommentContainer>

                <Comments>
                    <CommentOwner>{userInfo.fullName}</CommentOwner>
                    <CommentBody>{comment.content}</CommentBody>
                </Comments>


            </CommentContainer>
        </Container>
    )
}

export default Comment
const Container = styled.div``
const CommentContainer = styled.div`
padding-bottom:10px;
`
const Comments = styled.div`
display:flex;
align-items:center;
padding:0 10px;
`
const CommentOwner = styled.div`
font-weight:500;
padding-right:10px;
`
const CommentBody = styled.div`
font-size:12px;
`
