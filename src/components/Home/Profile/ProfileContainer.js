import React, { useEffect, useState, useRef } from 'react'
import materialize from 'materialize-css';
import '../../../Assets/styles/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../actions/profile'
import Profile from './Profile';

const profileVariant = {
  hidden:
  {
    x: "-15vw",
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.2
    }
  },
}

const editProfileVariant = {
  hidden:
  {
    x: "-15vw",
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.5,
    }
  },
}



function ProfileContainer() {

  const dispatch = useDispatch()
  const profileStore = useSelector(state => state.profile)

  const [editProfile, setEditProfile] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    var elems = document.querySelectorAll('.materialboxed');
    materialize.Materialbox.init(elems);
    return () => {

    }
  })

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

      <Profile
        profileStore={profileStore}
        editProfileVariant={editProfileVariant}
        editProfile={editProfile}
        profileRef={profileRef}
        setEditProfile={setEditProfile}
        profileVariant={profileVariant}>

      </Profile>

    </>
  )
}

export default ProfileContainer
