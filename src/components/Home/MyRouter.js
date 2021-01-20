import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ProfileContainer from './Profile/ProfileContainer'
import FriendsContainer from './Friends/FriendsContainer'
import PostsContainer from './Posts/PostsContainer';
import PropTypes from 'prop-types';

function MyRouter({ openNav, handleLogout, closeNav }) {
    return (
        <Router>
            <div>
                <div class="navbar-fixed grey darken-4">
                    <nav class="grey darken-4">
                        <div class="nav-wrapper grey darken-4 container">
                            <a href="#" class="brand-logo center" ><span style={{ "font-size": "25px" }} class="material-icons">facebook</span></a>
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
                                    <a style={{ "padding-top": "5px" }} className='hover-link btn btn-large btn-flat transparent white-text right valign-wrapper'
                                        onClick={(e) => { handleLogout() }}><span class='material-icons right'>logout</span>Logout &nbsp;</a>
                                </li>
                            </ul>

                        </div>


                        <div id="mySidenav" class="my-sidenav">
                            <a href="#" class="closebtn" onClick={() => closeNav()}>&times;</a>
                            <Link to="/" style={{ "font-size": "20px" }}>Home</Link>
                            <Link to="/profile" style={{ "font-size": "20px" }}>View Profile</Link>
                            <Link to="/friends" style={{ "font-size": "20px" }}>View Friends</Link>
                        </div>


                    </nav>

                </div>

                <Switch>
                    <Route path="/profile">
                        <div className='' style={{ 'margin-top': "4rem" }}>

                            <ProfileContainer></ProfileContainer>

                        </div>
                    </Route>
                    <Route path="/friends">
                        <div className='' style={{ 'margin-top': "4rem" }}>

                            <FriendsContainer></FriendsContainer>

                        </div>
                    </Route>
                    <Route path="/">
                        <div className='' style={{ 'margin-top': "4rem" }}>

                            <PostsContainer></PostsContainer>

                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

MyRouter.propTypes = {
    openNav: PropTypes.func.isRequired,
    closeNav: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
}

export default MyRouter
