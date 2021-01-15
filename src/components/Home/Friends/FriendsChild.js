import React, { useEffect, useState } from 'react'
import materialize from 'materialize-css';
import './styles.css'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import {getProfile,addFriend,acceptRequest,declineRequest} from '../../../actions/profile'


function FriendsChild({ option }) {

    const friends = useSelector(state => state.profile.friends)
    const friendRequests = useSelector(state => state.profile.friendRequests)
    const users = useSelector(state => state.users)
    const profileStore = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const addFriendHandler = async (e,_id) =>
    {
            e.preventDefault()
            await dispatch(addFriend({_id:_id}))
        
    }

    const acceptRequestHandler = async (e,friend) =>
    {

        e.preventDefault()
        console.log("FASD",friend)
        await dispatch(acceptRequest({_id:friend._id,uid:friend.uid}))

    }

    const declineRequestHandler = async (e,friend) =>
    {

        e.preventDefault()
        console.log("FASD",friend)
        await dispatch(declineRequest({_id:friend._id,uid:friend.uid}))

    }


    switch (option) {

        case 'list':
            return (
                <div className='' style={{ 'padding': "0px 20px" }}>


                    {friends && friends.length > 0 ?

                        <ul class="collection">

                            {
                                friends.map(

                                    friend =>

                                        (
                                            <>
                                                <li class="collection-item avatar" style={{"margin":"10px"}}>
                                                    <img src={friend.userProfilePicture} style={{"margin-top":"10px"}} alt="" class="circle" />
                                                    <h5 class="">{friend.user} </h5>
                                                    <p>{friend.mobileNumber} <br></br>
                                                       {/* {friend.mobileNumber} */}
                                                        </p>
                                                    <a href="#!" class="btn-small indigo secondary-content"><i style={{"font-size":"30px"}} class="material-icons right ">account_circle</i>Info</a>
                                                </li>
                                            </>

                                        )


                                )
                            }
                        </ul>

                        : <div className='container center white' style={{"padding":"20px"}}>

                            <h5>{friends && friends.length===0 && 'No Friends Yet'}</h5>
                            </div>}

                    {/* <ul class="collection">
                        <li class="collection-item avatar">
                        <img src="images/yuna.jpg" alt="" class="circle" />
                        <span class="title">Title</span>
                        <p>First Line <br></br>
                            Second Line
                        </p>
                        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                        </li>
                    </ul> */}

                </div>
            )

        case 'requests':
            return (
                <div className='' style={{ 'padding': "0px 20px" }}>


                    {friendRequests && friendRequests.length > 0 ?

                        <ul class="collection">

                            {
                                friendRequests.map(

                                    request =>

                                        (
                                            <>
                                                <li class="collection-item avatar" style={{"margin":"10px"}}>
                                                    <img src={request.userProfilePicture} style={{"margin-top":"10px"}} alt="" class="circle" />
                                                    <h5 class="">{request.user} </h5>
                                                    <p><button className='btn-small indigo '
                                                        onClick={(e) => {acceptRequestHandler(e,request)}}>Add Friend</button>

                                                            <button className='btn-small red lighten-1' style={{"margin-left":"20px"}}
                                                        onClick={(e) => {declineRequestHandler(e,request)}}>Decline</button>
                                                        </p>
                                                   
                                                    <a href="#!" class="secondary-content"><i class="material-icons">user</i></a>
                                                </li>
                                            </>

                                        )


                                )
                            }
                        </ul>

                        : <div className='container center white' style={{"padding":"20px"}}>

                            <h5>{friendRequests && friendRequests.length===0 && 'No Friend Requests'}</h5>
                            </div>}

    

                </div>
            )

        case 'newFriends':
            return (

                <div className='' style={{ 'padding': "0px 20px" }}>


                    {users && users.length > 0 ?

                        <ul class="collection">

                            {
                                users.map(

                                    user =>

                                        (
                                            <>
                                                <li class="collection-item avatar" style={{"margin":"10px"}}>
                                                    <img src={user.profilePicture} style={{"margin-top":"10px"}}  alt="" class="circle" />
                                                    <h5 class="">{user.firstName} {user.lastName} </h5>
                                                    <p><button className='btn-small indigo'
                                                        onClick={(e) => {
                                                            addFriendHandler(e,user._id)}}>Add Friend</button>
                                                        </p>
                                                    <a href="#!" class="secondary-content"><i class="material-icons">user</i></a>
                                                </li>
                                            </>

                                        )


                                )
                            }
                        </ul>

                        : <div className='container center white' style={{"padding":"20px"}}>

                            <h5>{users && users.length===0 && 'No New Users'}</h5>
                            </div>}

    

                </div>

            )


        default:
            return (
                <div>
                    {option}

                </div>
            )

    }
}

export default FriendsChild
