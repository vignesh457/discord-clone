import React from 'react'
import { Avatar } from '@material-ui/core';
import "./Message.css"

function Message({message,photo,user,time}) {
  const timing = time?time.toDate():"";
  const parsedTime = timing.toLocaleString(undefined, { 
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
        <div className='message-ctn'>
            <div className='profile-part'>
                <Avatar src={photo} className='message-dp'/>
            </div>
            <div className='text-part'>
                <span className='user-name'>{user}</span><span className='timings'>{parsedTime}</span>
                <p className='text-message'>{message}</p>
            </div>
        </div>
    </>
  )
}

export default Message