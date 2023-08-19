import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import {auth} from "./firebase";
import {onAuthStateChanged} from 'firebase/auth'
import Loader from './components-mini/Loader';


function App() {
  const user = useSelector((state=>state.user.user))
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        //signIn
        dispatch({type:"login",payload:{
          uid: user.uid,
          photo: user.photoURL,
          email: user.email,
          displayName: user.displayName
        }})
      }
      else{
        //signOut
        dispatch({type: "logout"})
        dispatch({type:"resetChannel"})
      }
      setLoading(false);
    })
  }, [dispatch])
  
  if (loading) {
    return <Loader/>; // on loading state
  }

  return (
    <div className="App">
      {
        user?(
          <>
            <Sidebar/>
            <Chat/>
          </>
        ):(
          <Login/>
        )
      }
        
    </div>
  );
}

export default App;
