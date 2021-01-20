import React from 'react'
import PropTypes from 'prop-types';

function Login({ setDetails, details, error, isLoading, setError, handleSubmit }) {
    return (
        <div className='row upper-padding-small'>

            <form className='col s12 l6 offset-l3 m8 offset-m2 center white ' style={{ "padding": "50px" }} onSubmit={(e) => handleSubmit(e)}>

                <div className="row">
                    <div className="input-field col s12">
                        <i class="material-icons prefix">email</i>
                        <input id="email" type="email" className="validate" required={true} value={details.email}
                            onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                        <label for="email">Email</label>
                        <span className="helper-text" data-error="Please Enter a valid Email" data-success=""></span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i class="material-icons prefix">vpn_key</i>
                        <input id="password" type="password" required={true} className="validate" value={details.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })} />
                        <label for="password">Password</label>
                        <span className="helper-text" data-error="Please Enter a Password" data-success=""></span>
                    </div>
                </div>

                <button className='btn btn-large grey darken-1 hoverable'>Login</button>

                {error ? (<div className='row grey lighten-5' style={{ "margin-top": '30px', 'padding': "10px" }}>
                    <p className='center-align red-text'>
                        <a className="btn-floating btn btn-small btn-flat transparent"
                            onClick={() => { setError('') }}><i class="material-icons left red-text">cancel</i>
                        </a>{error}</p>
                </div>) : ''
                }

                {isLoading ? (
                    <div className="row" style={{ "margin-top": "25px" }}>
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
                ) : ''}

            </form>


        </div>
    )
}

Login.propTypes = {
    details: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setDetails: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    errors: PropTypes.string,
    isLoading: PropTypes.bool

}

export default Login
