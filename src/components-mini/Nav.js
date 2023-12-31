import React from 'react'
import Search from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./Nav.css"
import {auth} from '../firebase'
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';

function Nav() {
  const channelName = useSelector((state)=>state.app.channelName);
  const dispatch = useDispatch();

  return (
    <>
        <div className='chat-top'>
            <MenuIcon onClick={()=>dispatch({type:"menuToggle"})} className="icon menu"/>
            <div className='title'> 
              <h2 className='icon hash'>#</h2>
              <h3>{channelName?channelName:"general"}</h3>
            </div>
            <div className='search-box'><input className='search' placeholder='Search'/><Search/></div>
            <ExitToAppIcon onClick={()=>signOut(auth)} className='icon logout'/>
        </div>
    </>
  )
}

export default Nav