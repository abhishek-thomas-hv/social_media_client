import React from 'react'
import FileBase from 'react-file-base64'
import PropTypes from 'prop-types'

function EditProfile({ details, setDetails, handleSubmit, maleRef, dob, femaleRef, otherRef, isSending, loaderRef, message }) {
    return (
        <div>
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
        </div>
    )
}

EditProfile.propTypes = {
    details: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        mobileNumber: PropTypes.string,
        password: PropTypes.string,
        profilePicture: PropTypes.string,
        gender: PropTypes.string,
        dateOfBirth: PropTypes.string
    }).isRequired,
    setDetails: PropTypes.func,
    handleSubmit: PropTypes.func,
    maleRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    femaleRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    othereRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    dob: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    loaderRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    isSending: PropTypes.bool,
    message: PropTypes.string,
}

export default EditProfile
