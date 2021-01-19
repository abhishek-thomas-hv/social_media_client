import React, { useState } from 'react'
import '../../Assets/styles/styles.css'
import { LoginFormSubmit } from '../../actions/auth'
import { useDispatch } from 'react-redux'

function Login() {


  const [details, setDetails] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    setTimeout(async () => {

      const result = await LoginFormSubmit(details)

      setIsLoading(false)

      if (result.error) {
        setError(result.error)
      }

      else {
        dispatch({ type: "AUTHENTICATED", payload: result.data.user })
      }

    }, 1500);


  }

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

export default Login
