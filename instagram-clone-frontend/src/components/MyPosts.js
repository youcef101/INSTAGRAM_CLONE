import React from 'react'
import styled from 'styled-components'

function MyPosts() {
    return (
        <Container>
            <PostsContainer>
                <WrapContainer>
                    <Wrap>
                        <img src="/images/my-image.jpg" />

                    </Wrap>
                    <Wrap>
                        <img src="/images/my-image.jpg" />
                    </Wrap>
                    <Wrap>
                        <img src="/images/my-image.jpg" />
                    </Wrap>

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
//background-color:orange;
`
const WrapContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
`
const Wrap = styled.div`
//padding-left:15px;
display:flex;
align-items:center;
flex-grow:1;
width:25%;
img{
    cursor:pointer;
    width:90%;
    height:90%;
    object-fit:cover;
}

`





