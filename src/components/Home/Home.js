import React, { useEffect, useState } from 'react'
import materialize from 'materialize-css';
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/post'
import { logout } from '../../actions/auth'
import Posts from './Posts/Posts';
import './styles.css'
import Profile from './Profile/Profile'
import Friends from './Friends/Friends'
import {motion} from 'framer-motion'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {

        }
    },[])

    useEffect(() => {

        return () => {

        }
    }, [dispatch])

    const handleLogout = () =>
    {

        dispatch(logout())

    } 

    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
      }
      

      const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
      } 

    return (
        <div>

            <Router>
                <div>
                    <div class="navbar-fixed grey darken-4"
                        >
                        <nav class="grey darken-4">
                            <div class="nav-wrapper grey darken-4 container">
                                <a href="#" class="brand-logo center" ><span style={{"font-size":"25px"}} class="material-icons">work</span></a>
                                <a href="#" data-target="mobile-demo" class="sidenav-trigger" onClick={() => openNav()}><i class="material-icons">menu</i></a>
                                <ul className="left hide-on-med-and-down">
                                    <li className="hoverlist">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="hoverlist">
                                        <Link to="/profile">View Profile</Link>
                                    </li>
                                    <li className="hoverlist">
                                        <Link to="/friends">View Friends</Link>
                                    </li>
                                </ul>

                                <ul className='right'>
                                    <li>
                                    <a style={{"padding-top":"5px"}}className='hover-link btn btn-large btn-flat transparent white-text right valign-wrapper' 
                                onClick ={(e) => {handleLogout()}}><span class='material-icons right'>logout</span>Logout &nbsp;</a>
                                    </li>
                                </ul>
                    
                            </div>


                            <div id="mySidenav" class="my-sidenav">
                                <a href="#" class="closebtn" onClick={() => closeNav()}>&times;</a>
                                <Link to="/" style={{"font-size":"20px"}}>Home</Link>
                                <Link to="/profile"  style={{"font-size":"20px"}}>View Profile</Link>
                                <Link to="/friends"  style={{"font-size":"20px"}}>View Friends</Link>
                            </div>
                            
                        
                        </nav>

                    </div>

                    <Switch>
                        <Route path="/profile">
                            <div className='' style={{ 'margin-top': "4rem" }}>

                                <Profile></Profile>

                            </div>
                        </Route>
                        <Route path="/friends">
                            <div className='' style={{ 'margin-top': "4rem" }}>

                                <Friends></Friends>

                            </div>
                        </Route>
                        <Route path="/">
                            <div className='' style={{ 'margin-top': "4rem" }}>

                                <Posts></Posts>

                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>

        </div >
    )
}

export default Home
