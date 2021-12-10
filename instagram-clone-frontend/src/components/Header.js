import React, { useContext } from 'react'
import styled from 'styled-components'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import axiosInstance from '../axios';


function Header() {
    //const history = useHistory()
    const { user } = useContext(AuthContext)

    const SignOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('user_login')
        //history.push('/login')

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
                <Link to={`/profile/${user.fullName}`}>
                    <UserImg >
                        <img src={user.profileImg || '/images/person/noProfile.png'} alt="" />
                    </UserImg>
                </Link>

            </MenuIconContainer>

            <LogoutBtn onClick={SignOut}>
                <Txt>Logout</Txt>
                <LogoutIC>
                    <ExitToAppIcon fontSize="small" />
                </LogoutIC>
            </LogoutBtn>


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
@media(max-width:565px){
  display:none;
}
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
    width:35px;
    height:35px;
    border:1px solid #000;
}
`
const LogoutBtn = styled.div`
display:flex;
align-items:center;
cursor:pointer;
`
const Txt = styled.div``
const LogoutIC = styled.div``

