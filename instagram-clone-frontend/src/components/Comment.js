import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'

function Comment() {
    const [userInfo, setUserInfo] = useState('')

    // useEffect(() => {

    //     axiosInstance.get(`/user/${comment_userId}`)
    //         .then(res => {

    //             setUserInfo(res.data)

    //         });

    // }, [])
    return (
        <Container>
            <CommentContainer>

                <Comments>
                    <CommentOwner>ahmed</CommentOwner>
                    <CommentBody>hello are you ok ?</CommentBody>
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
