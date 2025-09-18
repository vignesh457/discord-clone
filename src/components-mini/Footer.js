import React from 'react'
import "./Footer.css"
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

function Footer() {
  const user = useSelector((state)=>state.user.user);
  const id = user.displayName.split(" ")[0]+"_"+user.uid.substring(0,5);

  return (
    <>
        <div className='sidebar-footer'>
          <div className='sidebar-footer-main'>
            <Avatar src={user.photo} className='icon-side-profile'/>
            <div className='sidebar-footer-text'>
              <h3>{user.displayName}</h3>
              <p>#{id}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Footer