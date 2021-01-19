import React, { useState, useEffect, useRef } from 'react'
import materialze from 'materialize-css'
import { SignUpFormSubmit } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import '../../Assets/styles/styles.css'
import Signup from './Signup'

function SignupContainer() {

    const dispatch = useDispatch()

    useEffect(() => {
        var element = document.querySelectorAll('.datepicker');
        materialze.Datepicker.init(element, {
            container: "html",
            onClose: function (date) {
                // setDetails({...details,dateOfBirth:dob.current.value})
            },
            maxDate: new Date(2015, 1, 1),
            yearRange: [1970, 2015],
            autoClose: true
        });



        return () => {

        }
    }, [])

    const dob = useRef()

    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
        profilePicture: '',
        gender: 'male',
        dateOfBirth: ''
    })

    const [confirmPassword, setconfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        picture: ''
    })

    const handleSubmit = async (event) => {

        event.preventDefault()

        if (details.password !== confirmPassword) {
            setErrors({
                email: '',
                password: 'Please Enter same password in both fields',
                picture: ''
            })
            return
        }

        if (details.profilePicture === '') {
            setErrors({
                email: '',
                password: '',
                picture: 'Please Select Profile Picture'
            })
            return
        }

        setIsLoading(true)
        setErrors({
            email: '',
            password: '',
            picture: ''
        })


        details.dateOfBirth = dob.current.value
        setTimeout(async () => {

            const result = await SignUpFormSubmit(details)
            setIsLoading(false)

            if (result.errors) {
                setErrors({ password: result.errors.password, email: result.errors.email })
            }

            else {
                dispatch({ type: "AUTHENTICATED", payload: result.data.user })
            }

        }, 1500);


    }

    return (

        <Signup
            details={details}
            handleSubmit={handleSubmit}
            setDetails={setDetails}
            errors={errors}
            confirmPassword={confirmPassword}
            setconfirmPassword={setconfirmPassword}
            dob={dob}
            isLoading={isLoading}
        >

        </Signup>
    )
}

export default SignupContainer
