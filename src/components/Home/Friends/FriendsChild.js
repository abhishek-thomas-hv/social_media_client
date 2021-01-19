import React, { useEffect } from 'react'
import '../../../Assets/styles/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { addFriend, acceptRequest, declineRequest } from '../../../actions/profile'
import PropTypes from 'prop-types';
import { motion } from "framer-motion"

const friendChildVariants = {
    hidden:
    {
        y: "-10vw",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            delay: 0.2
        }
    },
}

function FriendsChild({ option }) {

    const friends = useSelector(state => state.profile.friends)
    const friendRequests = useSelector(state => state.profile.friendRequests)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    const addFriendHandler = async (e, _id) => {
        e.preventDefault()
        await dispatch(addFriend({ _id: _id }))

    }

    const acceptRequestHandler = async (e, friend) => {

        e.preventDefault()
        await dispatch(acceptRequest({ _id: friend._id, uid: friend.uid }))

    }

    const declineRequestHandler = async (e, friend) => {

        e.preventDefault()
        await dispatch(declineRequest({ _id: friend._id, uid: friend.uid }))

    }

    useEffect(() => {
        return () => {

        }
    }, [])


    switch (option) {

        case 'list':
            return (
                <motion.div className='' style={{ 'padding': "0px 20px" }}
                    variants={friendChildVariants}
                    animate="visible"
                    initial="hidden">


                    {friends && friends.length > 0 ?

                        <ul class="collection">

                            {
                                friends.map(

                                    (friend, id) =>

                                        (
                                            <>
                                                <li class="collection-item avatar" style={{ "margin": "10px" }}>
                                                    <img src={friend.userProfilePicture} style={{ "margin-top": "10px" }} alt="" class="circle" />
                                                    <h5 class="">{friend.user} </h5>
                                                    <p>{friend.mobileNumber} <br></br>
                                                    </p>
                                                    <a href="#" class="btn-floating indigo secondary-content"><i style={{ "font-size": "30px" }} class="material-icons right ">account_circle</i>Info</a>
                                                </li>
                                            </>

                                        )


                                )
                            }
                        </ul>

                        : <div className='container center white' style={{ "padding": "20px" }}>

                            <h5>{friends && friends.length === 0 && 'No Friends Yet'}</h5>
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

                </motion.div>
            )

        case 'requests':
            return (
                <motion.div className='' style={{ 'padding': "0px 20px" }}
                    variants={friendChildVariants}
                    animate="visible"
                    initial="hidden">


                    {friendRequests && friendRequests.length > 0 ?

                        <ul class="collection">

                            {
                                friendRequests.map(

                                    request =>

                                        (
                                            <>
                                                <li class="collection-item avatar" style={{ "margin": "10px" }}>
                                                    <img src={request.userProfilePicture} style={{ "margin-top": "10px" }} alt="" class="circle" />
                                                    <h5 class="">{request.user} </h5>
                                                    <p><button className='btn-small indigo '
                                                        onClick={(e) => { acceptRequestHandler(e, request) }}>Add Friend</button>

                                                        <button className='btn-small red lighten-1' style={{ "margin-left": "20px" }}
                                                            onClick={(e) => { declineRequestHandler(e, request) }}>Decline</button>
                                                    </p>

                                                    <a href="#!" class="secondary-content"><i class="material-icons">user</i></a>
                                                </li>
                                            </>

                                        )


                                )
                            }
                        </ul>

                        : <div className='container center white' style={{ "padding": "20px" }}>

                            <h5>{friendRequests && friendRequests.length === 0 && 'No Friend Requests'}</h5>
                        </div>}



                </motion.div>
            )

        case 'newFriends':
            return (
                <motion.div className='' style={{ 'padding': "0px 20px" }}
                    variants={friendChildVariants}
                    animate="visible"
                    initial="hidden">


                    {users && users.length > 0 ?

                        <ul class="collection">

                            {
                                users.map(

                                    user =>

                                        (
                                            <>
                                                <li class="collection-item avatar" style={{ "margin": "10px" }}>
                                                    <img src={user.profilePicture} style={{ "margin-top": "10px" }} alt="" class="circle" />
                                                    <h5 class="">{user.firstName} {user.lastName} </h5>
                                                    <p><button className='btn-small indigo'
                                                        onClick={(e) => {
                                                            addFriendHandler(e, user._id)
                                                        }}>Add Friend</button>
                                                    </p>
                                                    <a href="#!" class="secondary-content"><i class="material-icons">user</i></a>
                                                </li>
                                            </>

                                        )


                                )
                            }
                        </ul>

                        : <div className='container center white' style={{ "padding": "20px" }}>

                            <h5>{users && users.length === 0 && 'No New Users'}</h5>
                        </div>}



                </motion.div>

            )


        default:
            return (
                <div>
                    {option}

                </div>
            )

    }
}


FriendsChild.propTypes = {
    name: PropTypes.string
}


export default FriendsChild
