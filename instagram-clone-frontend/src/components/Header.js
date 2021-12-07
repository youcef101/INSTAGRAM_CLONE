import React from 'react'
import styled from 'styled-components'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddRoundedIcon from '@material-ui/icons/AddRounded';


import { useHistory } from 'react-router-dom';


function Header() {
    const history = useHistory()

    const SignOut = () => {

        localStorage.removeItem('user')

        history.push('/login')

    }
    return (
        <Container>
            <LogoImg>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </LogoImg>
            <MenuIconContainer>
                <MenuIcon>
                    <HomeRoundedIcon />
                </MenuIcon>
                <MenuIcon>
                    <NearMeOutlinedIcon />
                </MenuIcon>
                <MenuIcon>
                    <ExploreOutlinedIcon />
                </MenuIcon>
                <MenuIcon>
                    <FavoriteBorderRoundedIcon />
                </MenuIcon>
                <MenuIcon className="post" >
                    <input type="file" id="file" multiple />
                    <label htmlFor="file">
                        <AddRoundedIcon />
                    </label>

                </MenuIcon>
                <UserImg >
                    <img src="/images/my-image.jpg" alt="" />
                </UserImg>

            </MenuIconContainer>


        </Container>
    )
}

export default Header
const Container = styled.div`
height:55px;
background-color:white;
border-bottom:1px solid #bfbfbf;
display:flex;
align-items:center;
justify-content:space-around;
position:fixed;
top:0;
left:0;
right:0;
z-index:100;
`
const LogoImg = styled.div`
cursor:pointer;
display:flex;
align-items:center;
img{
width:120px;
height:40px;
}
`
const MenuIconContainer = styled.div`
display:flex;
align-items:center;
`
const MenuIcon = styled.div`
margin:0 15px;
display:flex;
justify-content:center;
align-items:center;
input{
    display:none;
}
label{
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
}
`
const UserImg = styled.div`
cursor:pointer;
display:flex;
align-items:center;
img{
    border-radius:50%;
    width:27px;
    height:27px;
    border:2px solid #000;
}
`

