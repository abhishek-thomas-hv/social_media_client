import React, { useState } from 'react'
import '../../Assets/styles/styles.css'
import SignupContainer from './SignupContainer'
import LoginContainer from './LoginContainer'

function Wrapper() {


    const [isregister, setIsRegister] = useState(false)


    return (
        <div className='background'>

            <div className='container center-align upper-padding'>

                <div className='row'>

                    <div className='col s6 l4 offset-l2'>
                        <button className='btn btn-large right white darken-3 grey-text text-darken-2 hoverable'
                            onClick={() => setIsRegister(true)}>
                            <i class="material-icons left">how_to_reg</i>Signup</button>
                    </div>
                    <div className='col s6 l4'>
                        <button className='btn btn-large left white darken-3 grey-text text-darken-2 hoverable'
                            onClick={() => setIsRegister(false)}>
                            <i class="material-icons left">login</i>Login</button>
                    </div>

                </div>

                {isregister ? <SignupContainer /> : <LoginContainer />
                }

            </div>

        </div>
    )
}

export default Wrapper
