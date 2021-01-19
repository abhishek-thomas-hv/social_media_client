import React, { useState } from 'react'
import '../../Assets/styles/styles.css'
import { LoginFormSubmit } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import Login from './Login'

function LoginContainer() {

  const [details, setDetails] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading1] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading1(true)
    setError('')

    setTimeout(async () => {

      const result = await LoginFormSubmit(details)

      setIsLoading1(false)

      if (result.error) {
        setError(result.error)
      }

      else {
        dispatch({ type: "AUTHENTICATED", payload: result.data.user })
      }

    }, 1500);


  }

  return (

    <Login
      setDetails={setDetails}
      details={details}
      error={error}
      isLoading={isLoading}
      setError={setError}
      handleSubmit={handleSubmit}
    >

    </Login>



  )
}

export default LoginContainer
