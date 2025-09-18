import React from 'react'
import Search from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Nav.css"
import {auth} from '../firebase'
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
  const channelName = useSelector((state)=>state.app.channelName);
  const user = useSelector((state)=>state.user.user);
  const dispatch = useDispatch();
  const handleSignOut = () =>{
    if(user.displayName=="Anonymous"){
      dispatch({type: "logout"})
      dispatch({type:"resetChannel"})
    }
    else
      signOut(auth)
  }
  return (
    <>
        <div className='chat-top'>
            <MenuIcon onClick={()=>dispatch({type:"menuToggle"})} className="icon menu"/>
            <div className='title'> 
              <h2 className='icon hash'>#</h2>
              <h3>{channelName?channelName:"general"}</h3>
            </div>
            <div className='search-box'><input className='search' placeholder='Search'/><Search/></div>
            <ExitToAppIcon onClick={handleSignOut} className='icon logout'/>
        </div>
    </>
  )
}

export default Nav