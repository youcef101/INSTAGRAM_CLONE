import React, { useContext, useEffect } from 'react';
import './App.css';
//import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register'
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Login from './components/Login';
//import { decryptData } from './Utils';
//import axiosInstance from './axios'
import Profile from './components/Profile';
//import MyPosts from './components/MyPosts';
import Saved from './components/Saved';
import { AuthContext } from './context/AuthContext';
import EditUser from './components/EditUser';

function App() {
  const { user } = useContext(AuthContext)
  //const history = useHistory()



  // useEffect(() => {
  //   let local_user = localStorage.getItem('user')
  //   console.log(user)
  //   if (!local_user) {
  //     history?.push('/login')
  //     // const salt = process.env.SALT || '6d090796-ecdf-11ea-adc1-0242ac120003';
  //     // const originalData = decryptData(user, salt);
  //     // console.log(originalData.email)
  //     // dispatch(setSignIn(originalData));
  //   }


  //}, [])

  return (
    <div className="App">

      <Router >


        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>

          <Route path="/profile/:fullName">
            <Profile />
          </Route>
          <Route path="/:userId/edit">
            <EditUser />
          </Route>
          <Route path="/profile/saved">
            <Saved />
          </Route>
          {/* <Route path="/profile/my-posts">
            <MyPosts />
          </Route> */}

        </Switch>


      </Router>


    </div>
  );
}

export default App;
