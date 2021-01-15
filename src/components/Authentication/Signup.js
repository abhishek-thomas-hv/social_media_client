import React,{useState,useEffect,useRef} from 'react'
import materialze from 'materialize-css'
import {SignUpFormSubmit} from '../../actions/auth'
import FileBase from 'react-file-base64'
import { useStore } from 'react-redux'
import {useDispatch,useSelector} from 'react-redux'
import './styles.css'

function Signup() {

    const dispatch=useDispatch()
    useEffect(() => {
        var element = document.querySelectorAll('.datepicker');
        materialze.Datepicker.init(element, {
            container: "html",
            onClose: function(date) {
                // setDetails({...details,dateOfBirth:dob.current.value})
            },
            minDate: new Date(1950,1,1),
            maxDate: new Date(2015,1,1),
            yearRange:[1970,2015],
            autoClose: true
          });
    
      

        return () => {
            
        }
    },[])

    const dob = useRef()

    const [details, setDetails] = useState({
        firstName:'',
        lastName:'',
        email:'',
        mobileNumber:'',
        password:'',
        profilePicture:'',
        gender:'male',
        dateOfBirth:''
    })

    const [confirmPassword, setconfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [errors, setErrors] = useState({
        email:'',
        password:'',
        picture:''
    })

    const handleSubmit = async (event) =>
    {
        
        event.preventDefault()

        if(details.password !== confirmPassword)
        {
            setErrors({
                email:'',
                password:'Please Enter same password in both fields',
                picture:''
            })
            return
        }

        if(details.profilePicture ==='')
        {
            setErrors({
                email:'',
                password:'',
                picture:'Please Select Profile Picture'
            })
            return
        }

        console.log(details)
        setIsLoading(true)
        setErrors({
            email:'',
            password:'',
            picture:''
        })

        
        details.dateOfBirth = dob.current.value
        setTimeout(async () => {
            
            const result = await SignUpFormSubmit(details)
            console.log(result)
            setIsLoading(false)

        if(result.errors)
        {
            setErrors({password:result.errors.password,email:result.errors.email})
        }

        else
        {
            dispatch({type:"AUTHENTICATED",payload:result.data.user})
        }
            
        }, 1500);

        
    }

    return (
        <div className='row upper-padding-small'>
            <form className='col s12 l10 m10 offset-m1 offset-l1 center white' style={{"padding":"50px"}} 
            onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="input-field col s12 l6">
                    <i class="material-icons prefix">spellcheck</i>
                        <input required={true}
                        value={details.firstName} 
                        onChange={(e) => {setDetails({...details,firstName:e.target.value})}  }
                        id="first_name" type="text" className="validate"/>
                        <span className="helper-text" data-error="Please Enter First Name" data-success=""></span>
                        <label for="first_name">First Name</label>
                    </div>
                    <div className="input-field col s12 l6">
                    <i class="material-icons prefix">spellcheck</i>
                        <input  required={true}  id="last_name" 
                        value={details.lastName} 
                        onChange={(e) => {setDetails({...details,lastName:e.target.value})}  }
                        type="text" className="validate"/>
                        <span className="helper-text" data-error="Please Enter Last Name" data-success=""></span>
                        <label for="last_name">Last Name</label>
                    </div>
                 </div>
                 <div className="row">
                    <div className="input-field col s12 l6">
                    <i class="material-icons prefix">email</i>
                        <input  required={true} id="email" 
                         value={details.email} 
                         onChange={(e) => {setDetails({...details,email:e.target.value})}  }
                         type="email" className="validate"/>
                        <label for="email">Email</label>
                        <span className="helper-text" data-error="Please Enter a valid Email Address" data-success=""></span>
                        <span className='red-text'>{errors.email}</span>
                    </div>
                    <div className="input-field col s12 l6">
                    <i class="material-icons prefix">phone</i>
                        <input  required={true} id="mobile_number" 
                         value={details.mobileNumber} 
                         onChange={(e) => {setDetails({...details,mobileNumber:e.target.value})}  }
                         type="text" className="validate"/>
                        <label for="mobile_number">Mobile Number</label>
                        <span className="helper-text" data-error="Please Enter Mobile Number" data-success=""></span>
                    </div>
                 </div>
                 <div className="row">
                    <div className="input-field col s12 l6">
                    <i class="material-icons prefix">vpn_key</i>
                        <input  required={true} id="password" 
                         value={details.password} 
                         onChange={(e) => {setDetails({...details,password:e.target.value})}  }
                         type="password" className="validate"/>
                        <label for="password">Password</label>
                        <span className="helper-text" data-error="Please Enter Password" data-success=""></span>
                        <span className='red-text'>{errors.password}</span>
                    </div>
                    <div className="input-field col s12 l6">
                    <i class="material-icons prefix">vpn_key</i>
                        <input  required={true} id="confirm_password" 
                        value={confirmPassword}
                        onChange={(e) => {setconfirmPassword(e.target.value)}  }
                        type="password" className="validate"/>
                        <label for="confirm_password">Confirm Password</label>
                        <span className="helper-text" data-error="Please Confirm Password" data-success=""></span>
                    </div>
                </div>

                <div classNamess="row">
                    <div className="input-field col s12 l12">
                    <i class="material-icons prefix">calendar_today</i>
                    <input required={true} id="birthdate" 
                    type="text" className="datepicker" defaultValue='' ref={dob}/>
                        <label for="birthdate">Date of Birth</label>
                    </div>
                </div>

                <div className="row" style={{'padding-top':"100px"}} onChange={(e) => {setDetails({...details,gender:e.target.value})}}>
                     <i style={{'font-size':"50px"}} class="fa fa-male col prefix"></i>
                    <div className="col">
                        <p>
                        <label>
                            <input name="gender" type="radio" value="male" defaultChecked />
                            <span>Male</span>    
                        </label>
                        </p>
                    </div>
                    <div className="col">
                        <p>
                        <label>
                            <input name="gender" type="radio"  value="female" />
                            <span>Female</span>    
                        </label>
                        </p>
                    </div>
                    <div className="col">
                        <p >
                        <label>
                            <input name="gender" type="radio" value="other" />
                            <span>Other</span>    
                        </label>
                        </p>
                    </div>
                    
                </div>

                <div className="row">
                    <div className='col s12'>
                    <div class="file-field input-field">
                        <div class="btn grey darken-1">
                        <span>
                                      <i class="material-icons left">linked_camera</i>  Profile Picture
                                        </span>
                            <FileBase type="file" className=" " multiple={false} 
                                onDone={({base64}) => {setDetails({...details,profilePicture:base64})} }>
                                </FileBase>
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" />
                        </div>
                        </div>
                        <p class='red-text text-lighten-1'>{errors.picture}</p>
                   
                    </div>
                </div>
                 

                
                 
                 <button className='btn btn-large grey darken-1 hoverable' style={{'margin-top':"15px"}}>Sign Up</button>


                 {isLoading?(
                    <div className="row" style={{"margin-top":"25px"}}>
                     <div className="preloader-wrapper big active">
                     <div className="spinner-layer spinner-green-only">
                       <div className="circle-clipper left">
                         <div className="circle"></div>
                       </div><div className="gap-patch">
                         <div className="circle"></div>
                       </div><div className="circle-clipper right">
                         <div className="circle"></div>
                       </div>
                     </div>
                   </div>
                   </div>
                ):''}

            </form>
            
            
        </div>
    )
}

export default Signup
