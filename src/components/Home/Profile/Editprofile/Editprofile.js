import React, { useState, useEffect, useRef } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import materialize from 'materialize-css';
import { editProfile } from '../../../../actions/profile'
import '../../../../Assets/styles/styles.css'


function Editprofile() {

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
            // formRef.current.scrollIntoView({
            //     behavior: "smooth",
            //     block: "nearest",
            //     inline: "start"

            //   });
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
        <div className='row'  >
            <form className=' col s10 offset-s1 l12 center' onSubmit={(e) => handleSubmit(e)} style={{ "padding": "30px" }}>

                <h6 style={{ "margin-bottom": "30px" }} className='center'><u>Edit Profile</u> </h6>

                <div className="row">
                    <div className="input-field col s12 l12">
                        <i class="material-icons prefix">spellcheck</i>
                        <input required={true}
                            value={details.firstName}
                            onChange={(e) => { setDetails({ ...details, firstName: e.target.value }) }}
                            id="first_name" type="text" className="validate" />
                        <span className="helper-text" data-error="Please Enter First Name" data-success=""></span>
                        <label for="first_name" className='active'>First Name</label>
                    </div>
                    <div className="input-field col s12 l12">
                        <i class="material-icons prefix">spellcheck</i>
                        <input required={true} id="last_name"
                            value={details.lastName}
                            onChange={(e) => { setDetails({ ...details, lastName: e.target.value }) }}
                            type="text" className="validate" />
                        <span className="helper-text" data-error="Please Enter Last Name" data-success=""></span>
                        <label for="last_name" className='active'>Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 l12">
                        <i class="material-icons prefix">phone</i>
                        <input required={true} id="mobile_number"
                            value={details.mobileNumber}
                            onChange={(e) => { console.log(details); setDetails({ ...details, mobileNumber: e.target.value }); console.log(details); }}
                            type="text" className="validate" />
                        <label for="mobile_number" className='active'>Mobile Number</label>
                        <span className="helper-text" data-error="Please Enter Mobile Number" data-success=""></span>
                    </div>
                </div>

                <div classNamess="row">
                    <div className="input-field col s12 l12">
                        <i class="material-icons prefix">calendar_today</i>
                        <input required={true} id="birthdate"
                            defaultValue={details.dateOfBirth}
                            type="text" className="datepicker" ref={dob} />
                        <label for="birthdate" className='active'>Date of Birth</label>
                    </div>
                </div>

                <div className="row" style={{ 'padding-top': "100px" }} onChange={(e) => { setDetails({ ...details, gender: e.target.value }) }}>
                    <i style={{ 'font-size': "50px" }} class="fa fa-male col prefix"></i>
                    <div className="col">
                        <p>
                            <label>
                                <input name="gender" type="radio" value="male" ref={maleRef} />
                                <span>Male</span>
                            </label>
                        </p>
                    </div>
                    <div className="col">
                        <p>
                            <label>
                                <input name="gender" type="radio" value="female" ref={femaleRef} />
                                <span>Female</span>
                            </label>
                        </p>
                    </div>
                    <div className="col">
                        <p >
                            <label>
                                <input name="gender" type="radio" value="other" ref={otherRef} />
                                <span>Other</span>
                            </label>
                        </p>
                    </div>

                </div>

                <div className="row">
                    <div className='col s12'>
                        {/* <span>Profile Picture - </span>
                    <FileBase type="file" className=" " multiple={false} 
                    onDone={({base64}) => {setDetails({...details,profilePicture:base64})} }>
                    </FileBase> */}
                        <div class="file-field input-field">
                            <div class="btn indigo">
                                <span>
                                    <i class="material-icons left">linked_camera</i>Profile Picture
                                        </span>
                                <FileBase type="file" className=" " multiple={false}
                                    onDone={({ base64 }) => { setDetails({ ...details, profilePicture: base64 }) }}>
                                </FileBase>
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class='row'>
                    <button type="submit" className='btn btn-medium indigo hoverable' style={{ 'margin-top': "15px" }}>Edit Profile</button>
                </div>

                {isSending ? (
                    <div class='row' ref={loaderRef} >

                        {/* <div class="square center col s4 offset-s4">
                                        <div></div>
                                        <div></div>
                                    </div> */}

                        <div class="bouncing center col s4 offset-s4">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                )
                    : ''}

                {message && (
                    <div className='container center grey lighten-4 z-depth-2' style={{ "padding": '5px 10px', "margin-top": '25px' }}>
                        <p style={{ "font-size": "17px" }}><b>{message}</b></p>
                    </div>
                )

                }


            </form>

        </div>
    )
}

export default Editprofile
