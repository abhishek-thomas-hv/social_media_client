import React, { useEffect, useState } from 'react'
import materialize from 'materialize-css';
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/post'
import { logout } from '../../actions/auth'
import Posts from './Posts/Posts';
import './styles.css'
import Profile from './Profile/Profile'
import Friends from './Friends/Friends'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        materialize.Sidenav.init(elems);
        return () => {

        }
    }, [])

    useEffect(() => {

        return () => {

        }
    }, [dispatch])

    const handleLogout = () =>
    {

        dispatch(logout())

    } 

    return (
        <div>

            <Router>
                <div>
                    <div class="navbar-fixed grey darken-4">
                        <nav class="grey darken-4">
                            <div class="nav-wrapper grey darken-4 container">
                                <a href="#!" class="brand-logo center" ><span style={{"font-size":"25px"}} class="material-icons">work</span></a>
                                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                                <ul class="left hide-on-med-and-down">
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
                        </nav>

                        <ul className="sidenav grey lighten-2" id="mobile-demo">
                            <li className="white-text">
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/profile">View Profile</Link>
                            </li>
                            <li>
                                <Link to="/friends">View Friends</Link>
                            </li>
                        </ul>

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
