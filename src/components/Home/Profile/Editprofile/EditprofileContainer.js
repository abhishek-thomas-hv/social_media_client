import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import materialize from 'materialize-css';
import { editProfile } from '../../../../actions/profile'
import '../../../../Assets/styles/styles.css'
import EditProfile from './EditProfile';


function EditprofileContainer() {

    const profileStore = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        profilePicture: '',
        gender: '',
        dateOfBirth: '',
        uid: '',
        _id: ''

    })

    const otherRef = useRef(null)
    const maleRef = useRef(null)
    const femaleRef = useRef(null)
    const loaderRef = useRef(null)

    const [isSending, setIsSending] = useState(false)
    const [message, setMessage] = useState('')

    const dob = useRef(profileStore.dateOfBirth)
    useEffect(() => {

        var element = document.querySelectorAll('.datepicker');
        materialize.Datepicker.init(element, {
            container: "html",
            onSelect: function (date) {
                setDetails({ ...details, dateOfBirth: dob.current.value })
            },
            minDate: new Date(1950, 1, 1),
            maxDate: new Date(2015, 1, 1),
            yearRange: [1970, 2015],
            autoClose: true,
            defaultDate: new Date(profileStore.dateOfBirth)
        });


        return () => {

        }
    }, [])

    useEffect(() => {

        setDetails({
            firstName: profileStore.firstName,
            lastName: profileStore.lastName,
            mobileNumber: profileStore.mobileNumber,
            profilePicture: profileStore.profilePicture,
            gender: profileStore.gender,
            uid: profileStore.uid,
            _id: profileStore._id,
            dateOfBirth: new Date(profileStore.dateOfBirth).toDateString()
        })

        if (profileStore.gender === "male") {
            maleRef.current.checked = true
        }
        else if (profileStore.gender === "female") {
            femaleRef.current.checked = true
        }
        else {
            otherRef.current.checked = true
        }


        return () => {

        }
    }, [])

    useEffect(() => {
        if (isSending) {
            loaderRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"

            });
        }
        return () => {

        }
    }, [isSending])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsSending(true)

        if (dob.current.value)
            details.dateOfBirth = dob.current.value
        console.log("YOWTF")

        setTimeout(async () => {

            const result = await dispatch(editProfile(details))
            setIsSending(false)

            if (result.EDIT_PROFILE_ERROR) {
                setMessage('There was an error Editing Profile')

                setTimeout(() => {

                    setMessage('')

                }, 3000);
            }

            else {
                setMessage('Profile Successfully Edited')

                setTimeout(() => {

                    setMessage('')

                }, 3000);
            }

        }, 1500);

    }

    return (
        <EditProfile
            details={details}
            setDetails={setDetails}
            handleSubmit={handleSubmit}
            maleRef={maleRef}
            femaleRef={femaleRef}
            dob={dob}
            otherRef={otherRef}
            isSending={isSending}
            loaderRef={loaderRef}
            message={message}>

        </EditProfile>
    )
}

export default EditprofileContainer
