import React from 'react'
import { motion } from "framer-motion"
import EditprofileContainer from './Editprofile/EditprofileContainer'
import PropTypes from 'prop-types'

function Profile({ profileStore, editProfile, profileRef, setEditProfile, profileVariant, editProfileVariant }) {
    return (
        <>

            {profileStore.firstName &&
                <div className='row profile-card' id=''>
                    <div ref={profileRef} className={`col s10 offset-s1 ${editProfile ? 'l4 offset-l1 animate-profile' : 'l6 offset-l3 animate-profile-back'} transparent`}>

                        <motion.div class="card" variants={profileVariant}
                            animate="visible"
                            initial="hidden" >
                            <div class="card-image">
                                <img src={profileStore.profilePicture} alt="" className='materialboxed' />
                                <a class="btn-floating halfway-fab indigo"
                                    onClick={(e, profileRef) => {
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
                        <EditprofileContainer ></EditprofileContainer>
                    </motion.div>)}

                </div>}

            {editProfile && (<div className='row hide-on-large-only'>
                <div className='col white s10 offset-s1'>
                    <EditprofileContainer></EditprofileContainer>
                </div>
            </div>)}

        </>
    )
}

Profile.propTypes = {
    profileStore: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        mobileNumber: PropTypes.string,
        profilePicture: PropTypes.string,
        gender: PropTypes.string,
        dateOfBirth: PropTypes.string,
        friends: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                uid: PropTypes.string,
                user: PropTypes.string,
                userProfilePicture: PropTypes.string,
                userFriends: PropTypes.arrayOf(PropTypes.string),
                gender: PropTypes.string,
                mobileNumber: PropTypes.string
            })
        ),
        friendRequests: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                uid: PropTypes.string,
                user: PropTypes.string,
                userProfilePicture: PropTypes.string,
                userFriends: PropTypes.arrayOf(PropTypes.string),
                gender: PropTypes.string,
                mobileNumber: PropTypes.string
            })
        ),
    }).isRequired,
    profileRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    editProfile: PropTypes.bool,
    setEditProfile: PropTypes.func
}

export default Profile
