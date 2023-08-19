import React from 'react'
import {auth, provider} from "../firebase"
import { signInWithPopup } from 'firebase/auth'
import "./Login.css"
import Button from '@material-ui/core/Button/Button'

function Login() {

    // function to manage the signin functionality(onClick)
    const signIn = ()=>{
        signInWithPopup(auth, provider)
        .catch((error)=>alert(error.message))
    }

  return (
    <div className='login-ctn'>
        <Button onClick={signIn} variant="contained" color="primary" className='signIn-btn'>Sign in</Button>
    </div>
  )
}

export default Login