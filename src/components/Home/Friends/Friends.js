import React,{useEffect, useState} from 'react'
import materialize from 'materialize-css';
import './styles.css'
import FileBase from 'react-file-base64'
import {useDispatch,useSelector} from 'react-redux'
import {getProfile,addFriend,acceptRequest} from '../../../actions/profile'
import {getUsers} from '../../../actions/users'
import FriendsChild from './FriendsChild';

function Friends() {

    const friends = useSelector(state => state.profile.friends)
    const friendRequests = useSelector(state => state.profile.friendRequests)
    const users = useSelector(state => state.users)

    const [option, setOption] = useState('list')

    const dispatch = useDispatch()

    useEffect(() => {
        
                async function get() 
            {
                await dispatch(getProfile())
            }
            get()

            async function getSomeUsers() 
            {
                await dispatch(getUsers())
            }
            getSomeUsers()

        
        return () => {
            
        }
    },[dispatch] )



    return (
        <>
        <div class='row'>


            <div className='col l4 offset-l1 s10 offset-s1 white'>


                                
                    <div class="collection" style={{"padding":"40px"}}>


                        <a  class={`collection-item ${option==='list'&& 'active' }`} style={{"padding":"20px"}} onClick = {() => setOption('list')}>
                            Friends List
                            <span class="secondary-content"><i class="material-icons">send</i></span>
                            </a>

                        <a class={`collection-item ${option==='requests'&& 'active' }`} style={{"padding":"20px"}}  onClick = {() => setOption('requests')}>
                            Friend Requests
                            <span class="secondary-content"><i class="material-icons">send</i></span>
                            </a>

                        <a class={`collection-item ${option==='newFriends'&& 'active' }`} style={{"padding":"20px"}}   onClick = {() => setOption('newFriends')}>
                            Find New Friends
                            <span class="secondary-content"><i class="material-icons">send</i></span>
                            </a>

                    </div>
            
            </div>


            <div className='col l5 offset-l1 hide-on-med-and-down'>

                    <FriendsChild option={option}>

                    </FriendsChild>

            </div>

            
        </div>


        <div className='row hide-on-large-only' style={{"margin-top":"50px"}}>

            <div className='col s12 m8 offset-m2'>

            <FriendsChild option={option}>

            </FriendsChild>

            </div>


        </div>

        </>
    )
}

export default Friends
