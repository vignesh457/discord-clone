import React, { useEffect, useState, useRef } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import "./Sidebar.css"
import AddIcon from '@material-ui/icons/Add';
import Channel from '../components-mini/Channel';
import Footer from '../components-mini/Footer';
import SidebarHeader from '../components-mini/SidebarHeader';
import db from '../firebase';
import {collection, onSnapshot, addDoc, serverTimestamp, query, orderBy} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';

function Sidebar() {
  const [channels, setChannels] = useState([])
  const channelRef = collection(db, 'channels');
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const chRef = useRef(null);
  const [expand, setExpand] = useState(true)
  const toggle = useSelector((state)=>state.app.toggle);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  //geting the viewport width of screen of user on initial render
  useEffect(() => {
    window.addEventListener('resize', ()=>setViewportWidth(window.innerWidth));
  }, []);

  //runs on every render to fetch the data from firebase and populate on UI
  useEffect(() => {
    const sortedChannelsRef = query(channelRef,orderBy("time","asc"))
    onSnapshot(sortedChannelsRef, (snapshot) => {
      setChannels(snapshot.docs.map((doc)=>{
        return {...doc.data(),id: doc.id}
      }))
    });
  }, []);

  //on change update, it will update the active channel in the redux.
  useEffect(()=>{
    if(!isFirstRender.current){
        let latestChannel = channels[channels.length-1]
        dispatch({type:"setActiveChannel", payload: {channelId: latestChannel.id, channelName: latestChannel.channelName}})
        chRef.current.scrollTo({top: chRef.current.scrollHeight,behavior: 'smooth'});
    }
  },[channels.length]);

  //adding channels to the firebase
  const addChannel = async()=>{
    isFirstRender.current = false;
    const channelName = prompt("Enter new channel name:");
    if(channelName){
      await addDoc(channelRef,{channelName: channelName, time: serverTimestamp()});
    }
  }

  
  return (
    <div className='sidebar' style={(viewportWidth>=730 || toggle)?{display:"block"}:{display:"none"}}>
        <SidebarHeader/>
        <div className='sidebar-bottom'>

            <div className='sidebar-bottom-header'>
              {expand && <ExpandMoreIcon onClick={()=>setExpand(!expand)}/>}
              {!expand && <ExpandLessIcon onClick={()=>setExpand(!expand)}/>}
              <h3>TEXT CHANNELS</h3>
              <AddIcon onClick={addChannel}/>
            </div>

            <div ref={chRef} className='channel-ctn' style={expand?{opacity:"1"}:{opacity:"0",height:"0"}}>
              {channels.map(ch=><Channel channelName={ch.channelName} id={ch.id} key={ch.id}/>)}
            </div>
            
        </div>
        <Footer/>
    </div>
  )
}

export default Sidebar