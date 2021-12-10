import React from 'react'
import styled from 'styled-components'

function MyPosts({ currentUserPosts }) {
    return (
        <Container>
            <PostsContainer>
                <WrapContainer>
                    {currentUserPosts &&
                        currentUserPosts.map(post =>
                            <Wrap key={Math.random()}>
                                <img src={post.postImg} alt='' />

                            </Wrap>
                        )}
                </WrapContainer>
            </PostsContainer>

        </Container>
    )
}

export default MyPosts
const Container = styled.div`
margin-top:20px;
display:flex;
align-items:center;
justify-content:center;
`
const PostsContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:80%;

`
const WrapContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
margin-bottom:15px;
`
const Wrap = styled.div`
display:flex;
align-items:center;
flex-grow:1;
width:25%;
img{
    cursor:pointer;
    width:400px;
    height:400px;
    object-fit:cover;
}

`





