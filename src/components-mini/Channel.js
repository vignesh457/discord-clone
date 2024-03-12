import React from "react";
import "./Channel.css"
import { useDispatch, useSelector } from "react-redux";

function Channel({id, channelName}) {
  const dispatch = useDispatch();
  const channelId = useSelector((state)=>state.app.channelId)
  const mystyle = (id===channelId)?{color: "white",backgroundColor:"#1E1F22"}:{};
  const clickHandler = ()=>{
    dispatch({type:"setActiveChannel", payload: {channelId: id, channelName: channelName}})
    dispatch({type:"menuToggle"})
  }
  return (
    <>
      <div className="channel" style={mystyle} onClick={clickHandler}>
        <h2 className="icon-side">#</h2>
        <h3>{channelName}</h3>
      </div>
    </>
  );
}

export default Channel;
