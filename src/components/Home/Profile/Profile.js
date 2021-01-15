import React, { useEffect, useState,useRef } from 'react'
import materialize from 'materialize-css';
import './styles.css'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../actions/profile'
import EditProfile from './Editprofile/Editprofile'

function Profile() {

    const dispatch = useDispatch()
    const profileStore = useSelector(state => state.profile)

    const [editProfile, setEditProfile] = useState(false)

    useEffect(() => {
        var elems = document.querySelectorAll('.materialboxed');
        var instances = materialize.Materialbox.init(elems);
        return () => {
            
        }
    }, [])

    useEffect(() => {

        async function get() {
            await dispatch(getProfile())
        }
        get()


        return () => {
        }
    }, [dispatch])

    return (
        <>
            {profileStore.firstName && <div className='row profile-card'>
                <div className={`col s10 offset-s1 ${editProfile?'l4 offset-l1':'l6 offset-l3'} transparent`}>

                <div class="card">
                    <div class="card-image">
                        <img src={profileStore.profilePicture} className='materialboxed'/>
                        <a class="btn-floating halfway-fab indigo"
                        onClick={() => {
                            setEditProfile(!editProfile)
                        }
                        
                        }
                        ><i class="material-icons">edit</i></a>
                    </div>
                    <div class="card-content">
                        <h3>{profileStore.firstName.toUpperCase()} {profileStore.lastName.toUpperCase()}</h3>
                        <br></br>
                        <h4> {profileStore.gender.toUpperCase()} </h4>
                        <br></br>
                        <p>{profileStore.mobileNumber}</p>
                        <p>{new Date(profileStore.dateOfBirth).toDateString()}</p>
                    </div>
                </div>

                </div>

            

                {editProfile && (<div className='col s10 offset-s1 l5 offset-l1 white hide-on-med-and-down'>
                    <EditProfile ></EditProfile>
                </div>)}

            </div>}

            {editProfile && (<div className='row hide-on-large-only'>
                <div className='col white s10 offset-s1'>
                    <EditProfile></EditProfile>
                </div>
            </div>)}
        </>
    )
}

export default Profile
