import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyPosts from './MyPosts';
import { Link, useParams } from 'react-router-dom';
import Saved from './Saved';
import axiosInstance from '../axios';
import { AuthContext } from '../context/AuthContext';


function Profile() {
    const { user } = useContext(AuthContext)
    const { fullName } = useParams()
    const [profile, setProfile] = useState('')
    const [currentUserPosts, setCurrentUserPosts] = useState('')


    useEffect(() => {
        const getCurrentUserProfile = async () => {
            try {
                const res = await axiosInstance.get(`/user/${fullName}/profile`);
                setProfile(res.data)
                //setCurrentUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getCurrentUserProfile()
    }, [fullName])

    const getCurrentUserPosts = async () => {
        try {
            const res = await axiosInstance.get(`/post/${profile._id}/all`)
            setCurrentUserPosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCurrentUserPosts()
    }, [profile._id])


    const followersNumber = profile?.followers?.length
    const followingsNumber = profile?.followings?.length
    const postsNumber = currentUserPosts?.length

    return (
        <Container>
            <ProfileContainer>

                <ProfileHeader>
                    <UserImg>
                        <img src={profile.profileImg || '/images/person/noProfile.png'} alt='' />
                    </UserImg>
                    <UserGeneralInfo>
                        <TopInfo>
                            <UserName>
                                <span>{profile.fullName}</span>
                            </UserName>
                            {user.fullName === fullName ?
                                <EditProfileBtn>
                                    <Link to={`/${profile._id}/edit`}>
                                        <span>Modifier profile</span>
                                    </Link>
                                </EditProfileBtn>
                                : null
                            }
                        </TopInfo>
                        <BottomInfo>
                            <Publication>
                                <span>
                                    <b>{postsNumber}</b> publications
                                </span>
                            </Publication>
                            <Abonnee>
                                <a href="#">
                                    <span>
                                        <b>{followersNumber}</b> abonnés
                                    </span>
                                </a>
                            </Abonnee>
                            <Abonnement>
                                <a href="#">
                                    <span>
                                        <b>{followingsNumber}</b> abonnement
                                    </span>
                                </a>
                            </Abonnement>
                        </BottomInfo>
                    </UserGeneralInfo>

                </ProfileHeader>

                <Divider>
                    <hr />
                </Divider>

                <TabsParent>
                    <MenuActivity>
                        <MenuItem>

                            <MenuIc>
                                <ViewComfyIcon fontSize="small" />
                            </MenuIc>
                            <MenuText>
                                <span>Posts</span>
                            </MenuText>

                        </MenuItem>
                        <MenuItem>
                            <MenuIc>
                                <LiveTvRoundedIcon fontSize="small" />
                            </MenuIc>
                            <MenuText>
                                <span>IGTV</span>
                            </MenuText>

                        </MenuItem>
                        <MenuItem>

                            <MenuIc>
                                <TurnedInNotRoundedIcon fontSize="small" />
                            </MenuIc>
                            <MenuText>
                                <span>saved</span>
                            </MenuText>

                        </MenuItem>

                        <MenuItem>

                            <MenuIc>
                                <PermIdentityRoundedIcon fontSize="small" />
                            </MenuIc>
                            <MenuText>
                                <span>tagged</span>
                            </MenuText>

                        </MenuItem>

                    </MenuActivity>



                    <TabContainer>
                        <MyPosts currentUserPosts={currentUserPosts} />
                    </TabContainer>
                    <TabContainer>
                        <Saved />
                    </TabContainer>
                </TabsParent>


            </ProfileContainer>
        </Container>
    )
}

export default Profile
const Container = styled.div`
                height:100vh;
                //background-color:orange;
                `
const ProfileContainer = styled.div`
                margin-top:100px;
                `
const ProfileHeader = styled.div`
                display:flex;
                align-items:center;
                justify-content:center;
                `
const UserImg = styled.div`
                cursor:pointer;
                display:flex;
                align-items:center;
                img{
                border-radius:50%;
                width:160px;
                height:160px;
                border:1px solid #bfbfbf;
                object-fit:cover;
}
                `
const UserGeneralInfo = styled.div`
                display:flex;
                flex-direction:column;
                margin-left:100px;

                `
const TopInfo = styled.div`
                display:flex;
                align-items:center;
                `
const UserName = styled.div`
                span{
                    font-size:30px;
                color: #262626;
}
                `
const EditProfileBtn = styled.div`
a{
    text-decoration:none;
}
display:flex;
justify-content:center;
                cursor:pointer;
                margin-left:20px;
                border:2px solid #bfbfbf;
                border-radius:4px;
                width:150px;
                padding:5px 5px;

                span{
                    font-weight:700;
                font-size:14px;
                color: #262626
}

                `
const BottomInfo = styled.div`
                display:flex;
                align-items:center;
                margin-top:50px;

                `
const Publication = styled.div`
                span{
                    font-size:20px;
}
                `
const Abonnee = styled.div`
                margin-left:40px;
                cursor:pointer;
                a{
                    text-decoration:none;
                color:#262626;
                font-size:20px;
    
}
                `
const Abonnement = styled(Abonnee)``
const Divider = styled.div`
                margin-top:45px;
                hr{
                    width:80%
}
                `
const MenuActivity = styled(TabList)`
                display:flex;
                align-items:center;
                justify-content:center;
                margin-top:15px;
                `
const MenuItem = styled(Tab)`
display:flex;
align-items:center;
margin-right:60px;
cursor:pointer;
a{
    text-decoration:none;
    display:flex;

    
}
                
            
`
const MenuIc = styled.div`
                display:flex;
                align-items:center;
                color:#737373;

                `
const MenuText = styled.div`
                padding-left:4px;
                span{
                    color:#737373;
                text-transform: uppercase;
}
 `
const TabContainer = styled(TabPanel)``
const TabsParent = styled(Tabs)``