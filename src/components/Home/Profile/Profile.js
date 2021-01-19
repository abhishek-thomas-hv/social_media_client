import React, { useEffect, useState, useRef } from 'react'
import materialize from 'materialize-css';
import '../../../Assets/styles/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../actions/profile'
import EditProfile from './Editprofile/Editprofile'
import { motion } from "framer-motion"

const profileVariant ={
    hidden:
    {
      x:"-15vw",
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        type:"spring",
        delay:0.2
      }
    },
  }

  const editProfileVariant ={
    hidden:
    {
      x:"-15vw",
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        type:"spring",
        delay:0.5,
      }
    },
  }



function Profile() {

    const dispatch = useDispatch()
    const profileStore = useSelector(state => state.profile)

    const [editProfile, setEditProfile] = useState(false)
    const profileRef = useRef(null)

    useEffect(() => {
        var elems = document.querySelectorAll('.materialboxed');
        materialize.Materialbox.init(elems);
        return () => {
            
        }
    },)

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
            {profileStore.firstName && 
            <div className='row profile-card' id=''>
                <div ref={profileRef} className={`col s10 offset-s1 ${editProfile?'l4 offset-l1 animate-profile':'l6 offset-l3'} transparent`}>

                <motion.div class="card" variants={profileVariant}
              animate="visible"
              initial="hidden" >
                    <div class="card-image">
                        <img src={profileStore.profilePicture} alt="" className='materialboxed'/>
                        <a class="btn-floating halfway-fab indigo"
                        onClick={(e,profileRef) => {
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
                </motion.div>

                </div>

            

                {editProfile && (<motion.div className='col s10 offset-s1 l5 offset-l1 white hide-on-med-and-down' variants={editProfileVariant}
                    animate="visible"
                    initial="hidden">
                    <EditProfile ></EditProfile>
                </motion.div>)}

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
