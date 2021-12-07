import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import { decryptData } from './Utils';
import axiosInstance from './axios'
import Profile from './components/Profile';
import MyPosts from './components/MyPosts';
import Saved from './components/Saved';

function App() {





  // useEffect(() => {
  //   let user = localStorage.getItem('user')
  //   console.log(user)
  //   if (user) {
  //     const salt = process.env.SALT || '6d090796-ecdf-11ea-adc1-0242ac120003';
  //     const originalData = decryptData(user, salt);
  //     console.log(originalData.email)
  //     dispatch(setSignIn(originalData));
  //   }
  //   getAllUser();

  // }, [])

  return (
    <div className="App">

      <Router >
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Header />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile/my-posts">
            <MyPosts />
          </Route>
          <Route path="/profile/saved">
            <Saved />
          </Route>
          <Route path="/:username/profile">
            <Profile />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>


      </Router>


    </div>
  );
}

export default App;
