import React from 'react'
import {auth, provider} from "../firebase"
import { signInWithPopup } from 'firebase/auth'
import "./Login.css"
import Button from '@material-ui/core/Button/Button'
import { useDispatch } from 'react-redux'

function Login() {
    const dispatch = useDispatch();
    // function to manage the signin functionality(onClick)
    const signIn = ()=>{
        signInWithPopup(auth, provider)
        .catch((error)=>alert(error.message))
    }
    const demoSignIn = ()=>{
      dispatch({type:"login",payload:{
        uid: Math.floor(Math.random()*1000).toString(),
        photo: null,
        email: "demo@gmail.com",
        displayName: "Anonymous",
      }})
    }
  return (
    <div className='login-ctn'>
        <Button onClick={signIn} variant="contained" color="primary" className='signIn-btn'>Sign in</Button><br/>
        <Button onClick={demoSignIn} variant="contained" className='signIn-btn' style={{marginTop: "20px", backgroundColor: "#339933", color: 'white'}}>
          Try Demo
        </Button>
    </div>
  )
}

export default Login