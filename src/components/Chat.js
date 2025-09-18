import React, {useRef, useEffect} from "react";
import "./Chat.css";
import Nav from "../components-mini/Nav";
import Message from "../components-mini/Message";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { addDoc,collection, serverTimestamp, query, orderBy, onSnapshot} from "firebase/firestore";
import db from "../firebase";
import { useSelector } from "react-redux";
import img from '../images/welcome.gif'
import EmojiPicker from 'emoji-picker-react';

function Chat() {
  const [input, setInput] = useState("")
  const [message,setMessage] = useState([])
  const [picker, setPicker] = useState(false)
  const messRef = useRef(null);
  const user = useSelector((state)=>state.user.user);
  const id = user.displayName.split(" ")[0]+"'s";

  const channelId = useSelector((state)=>state.app.channelId)
  const channelName = useSelector((state)=>state.app.channelName)
  const channelRef = collection(db,"channels");

  //for autoscroll down to latest message
  useEffect(() => {
    messRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [message])
  
  //for fetching the messages from firebase and store in local state(message)
  useEffect(() => {
    if(channelId){
      const messageRef = collection(channelRef,channelId,"messages");
      const sortedMessagesRef = query(messageRef,orderBy("time","asc"))
      onSnapshot(sortedMessagesRef, (querySnapshot) => {
        setMessage(querySnapshot.docs.map((doc)=>{
          return {...doc.data(),id: doc.id}
        }))
      });
    }
  }, [channelId])

  //for sending message to the firebase database
  const sendMessage = async(e)=>{
    e.preventDefault()
    if(input){
      const messageRef = collection(channelRef,channelId,"messages");
      setInput("");
      await addDoc(messageRef,{message: input, user: user.displayName, photo: user.photo, time: serverTimestamp()})
    }
  }

  //event handle for emoji pick
  const emojiClick = (e)=>{
    setInput(input+e.emoji)
  }

  //emoji picker launch btn toggling function
  const togglePicker = ()=>{
    setPicker(!picker)
  }

  return (
    <div className="chat">
      <Nav />
      <div className="chat-bottom">

        <div className="chat-bottom-ctn">
          {channelId && message.length===0 && <div className="welcome-text">Be the first to message<br/><img src={img}/></div>}
          {channelId && message.map((m)=><Message key={m.id} message={m.message} user={m.user} photo={m.photo} time={m.time}/>)}
          {!channelId && <div className="welcome-text">Welcome to<br/> {id} server <br/><img src={img}/></div>}
          <div ref={messRef}></div>
          <div className="picker" style={picker?{opacity:"1",visibility: "visible"}:{opacity:"0", visibility: "hidden"}}>
            {picker && <EmojiPicker onEmojiClick={emojiClick}/>}
          </div>
        </div>

        <div className="input-part">
          <form className="message-input" style={{display: channelId ? "flex":"none"}}>
            <input value={input} onFocus={()=>setPicker(false)} onChange={(e)=>setInput(e.target.value)} placeholder={"Message"+" #"+channelName} />
            <button type='submit' onClick={sendMessage} className="sendButton" ><SendIcon className="icon"/></button>
            <EmojiEmotionsIcon className="icon" onClick={togglePicker} />
          </form>
        </div>

      </div>
    </div>
  );
}

export default Chat;
