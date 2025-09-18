import React, { useState } from 'react'
import "./SidebarHeader.css"
import { useDispatch, useSelector } from 'react-redux';
import img from "../images/discord.png"
import ClearIcon from '@mui/icons-material/Clear';

function SidebarHeader() {
  const user = useSelector((state)=>state.user.user);
  const dispatch = useDispatch();
  const id = user.displayName.split(" ")[0]+"'s";

  return (
    <>
        <div className='sidebar-top'>
            <h3>{id} server</h3>
            <img src={img}/>
            <ClearIcon className='icon clear' onClick={()=>dispatch({type:"menuToggle"})}/>
        </div>
    </>
  )
}

export default SidebarHeader;